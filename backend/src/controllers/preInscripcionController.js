const { z } = require("zod");
const prisma = require("../utils/prisma");

const preInscripcionSchema = z.object({
  nombreApellido: z.string().min(3, "Nombre requerido"),
  numeroCelular: z.string().min(6, "Celular requerido"),
  carrera: z.string().min(3, "Carrera requerida"),
  turno: z.string().min(3, "Turno requerido"),
  horaContacto: z.string().min(3, "Horario requerido")
});

exports.crear = async (req, res) => {
  const parsed = preInscripcionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
  }

  const preInscripcion = await prisma.preInscripcion.create({
    data: parsed.data
  });

  return res.status(201).json(preInscripcion);
};

exports.obtenerTodas = async (req, res) => {
  const preInscripciones = await prisma.preInscripcion.findMany({
    orderBy: { createdAt: "desc" }
  });

  return res.json(preInscripciones);
};

exports.obtenerUna = async (req, res) => {
  const id = Number(req.params.id);

  const preInscripcion = await prisma.preInscripcion.findUnique({
    where: { id }
  });

  if (!preInscripcion) {
    return res.status(404).json({ error: "Pre-inscripción no encontrada" });
  }

  return res.json(preInscripcion);
};

exports.eliminar = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.preInscripcion.delete({
    where: { id }
  });

  return res.json({ message: "Pre-inscripción eliminada correctamente" });
};
