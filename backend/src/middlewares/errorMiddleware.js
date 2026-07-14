function errorMiddleware(error, req, res, next) {
  console.error(error);

  if (error.message?.includes("Solo se permiten") || error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: error.code === "LIMIT_FILE_SIZE" ? "La imagen no puede superar 5 MB" : error.message });
  }

  return res.status(500).json({ error: "Error interno del servidor" });
}

module.exports = errorMiddleware;
