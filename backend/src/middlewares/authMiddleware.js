const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    req.admin = jwt.verify(header.replace("Bearer ", ""), process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
