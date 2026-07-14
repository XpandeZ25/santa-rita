const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const prisma = require("../utils/prisma");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

exports.login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Datos de acceso inválidos" });
  }

  const admin = await prisma.admin.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (!admin) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const passwordOk = await bcrypt.compare(parsed.data.password, admin.password);

  if (!passwordOk) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({
    token,
    admin: { id: admin.id, email: admin.email }
  });
};

exports.me = async (req, res) => {
  return res.json({ admin: req.admin });
};
