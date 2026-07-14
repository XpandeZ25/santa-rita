const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { z } = require("zod");
const prisma = require("../utils/prisma");
const { cloudinary, hasCloudinaryConfig } = require("../utils/cloudinary");
const { emitImageChange } = require("../utils/imageEvents");

const imageMetaSchema = z.object({
  key: z.string().min(2),
  titulo: z.string().optional().or(z.literal("")),
  descripcion: z.string().optional().or(z.literal(""))
  ,posicion: z.coerce.number().int().min(0).optional()
  ,activo: z.union([z.boolean(), z.enum(["true", "false"])]).optional()
  ,seccion: z.enum(["header", "favicon", "hero", "slider", "about", "servicios", "instalaciones", "testimonios", "contacto", "footer", "fondo", "equipo", "galeria"]).optional()
});

const asBoolean = (value, fallback = true) => value === undefined ? fallback : value === true || value === "true";

function publicBaseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}

async function uploadLocal(req) {
  const extension = path.extname(req.file.originalname).toLowerCase() || ".png";
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${extension}`;
  const uploadPath = path.join(__dirname, "../../uploads", filename);

  await fs.writeFile(uploadPath, req.file.buffer);

  return {
    url: `${publicBaseUrl(req)}/uploads/${filename}`,
    publicId: filename,
    storage: "local"
  };
}

async function uploadCloudinary(file, seccion = "slider") {
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `santa-rita/${seccion}`, transformation: [{ width: 1920, height: 1080, crop: "limit", quality: "auto", fetch_format: "auto" }] },
      (error, response) => {
        if (error) reject(error);
        else resolve(response);
      }
    );

    uploadStream.end(file.buffer);
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    storage: "cloudinary",
    dimensiones: result.width && result.height ? `${result.width}x${result.height}` : null,
    formato: result.format,
    pesoByte: result.bytes
  };
}

async function removeStoredImage(image) {
  if (!image?.publicId) return;

  if (image.storage === "cloudinary" && hasCloudinaryConfig) {
    await cloudinary.uploader.destroy(image.publicId);
    return;
  }

  if (image.storage === "local") {
    const localPath = path.join(__dirname, "../../uploads", image.publicId);
    await fs.rm(localPath, { force: true });
  }
}

exports.obtenerPublicas = async (req, res) => {
  const imagenes = await prisma.imagenPagina.findMany({
    where: { activo: true, ...(req.query.seccion ? { seccion: req.query.seccion } : {}) },
    orderBy: [{ posicion: "asc" }, { createdAt: "asc" }]
  });

  return res.json(imagenes);
};

exports.obtenerCarrusel = (req, res) => { req.query.seccion = "slider"; return exports.obtenerPublicas(req, res); };

exports.obtenerTodas = async (req, res) => {
  const imagenes = await prisma.imagenPagina.findMany({ orderBy: [{ posicion: "asc" }, { createdAt: "asc" }] });
  return res.json(imagenes);
};

exports.crear = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  const parsed = imageMetaSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Datos de imagen inválidos" });
  }

  const seccion = parsed.data.seccion || "slider";
  const uploaded = hasCloudinaryConfig ? await uploadCloudinary(req.file, seccion) : { ...(await uploadLocal(req)), pesoByte: req.file.size, formato: path.extname(req.file.originalname).slice(1) };
  const count = await prisma.imagenPagina.count();

  const imagen = await prisma.imagenPagina.create({
    data: {
      key: parsed.data.key,
      titulo: parsed.data.titulo || null,
      descripcion: parsed.data.descripcion || null,
      posicion: parsed.data.posicion ?? count,
      activo: asBoolean(parsed.data.activo),
      seccion,
      ...uploaded
    }
  });

  emitImageChange("imagen:actualizada", imagen);

  return res.status(201).json(imagen);
};

exports.actualizar = async (req, res) => {
  const id = Number(req.params.id);
  const current = await prisma.imagenPagina.findUnique({ where: { id } });

  if (!current) {
    return res.status(404).json({ error: "Imagen no encontrada" });
  }

  const parsed = imageMetaSchema.partial().safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Datos de imagen inválidos" });
  }

  let storageUpdate = {};

  if (req.file) {
    await removeStoredImage(current);
    storageUpdate = hasCloudinaryConfig ? await uploadCloudinary(req.file, parsed.data.seccion || current.seccion) : { ...(await uploadLocal(req)), pesoByte: req.file.size, formato: path.extname(req.file.originalname).slice(1) };
  }

  const imagen = await prisma.imagenPagina.update({
    where: { id },
    data: {
      key: parsed.data.key || current.key,
      titulo: parsed.data.titulo ?? current.titulo,
      descripcion: parsed.data.descripcion ?? current.descripcion,
      posicion: parsed.data.posicion ?? current.posicion,
      activo: asBoolean(parsed.data.activo, current.activo),
      seccion: parsed.data.seccion ?? current.seccion,
      ...storageUpdate
    }
  });

  emitImageChange("imagen:actualizada", imagen);

  return res.json(imagen);
};

exports.eliminar = async (req, res) => {
  const id = Number(req.params.id);
  const image = await prisma.imagenPagina.findUnique({ where: { id } });

  if (!image) {
    return res.status(404).json({ error: "Imagen no encontrada" });
  }

  await removeStoredImage(image);
  await prisma.imagenPagina.delete({ where: { id } });
  emitImageChange("imagen:eliminada", { id, key: image.key });

  return res.json({ message: "Imagen eliminada correctamente" });
};

exports.reordenar = async (req, res) => {
  const schema = z.object({ ordenes: z.array(z.object({ id: z.coerce.number().int().positive(), posicion: z.coerce.number().int().min(0) })).min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Orden inválido" });

  await prisma.$transaction(parsed.data.ordenes.map(({ id, posicion }) =>
    prisma.imagenPagina.update({ where: { id }, data: { posicion } })
  ));
  emitImageChange("imagenes:reordenadas", parsed.data.ordenes);
  return res.json({ message: "Orden actualizado" });
};
