const express = require("express");
const adminController = require("../controllers/adminController");
const preInscripcionController = require("../controllers/preInscripcionController");
const imagenController = require("../controllers/imagenController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true, service: "Santa Rita API" });
});

router.post("/pre-inscripciones", preInscripcionController.crear);
router.get("/imagenes-publicas", imagenController.obtenerPublicas);
router.get("/imagenes/publicas", imagenController.obtenerPublicas);
router.get("/carrusel/imagenes", imagenController.obtenerCarrusel);

router.post("/admin/login", adminController.login);
router.get("/admin/me", authMiddleware, adminController.me);

router.get("/admin/pre-inscripciones", authMiddleware, preInscripcionController.obtenerTodas);
router.get("/admin/pre-inscripciones/:id", authMiddleware, preInscripcionController.obtenerUna);
router.delete("/admin/pre-inscripciones/:id", authMiddleware, preInscripcionController.eliminar);

router.get("/admin/imagenes", authMiddleware, imagenController.obtenerTodas);
router.post("/admin/imagenes", authMiddleware, upload.single("imagen"), imagenController.crear);
router.put("/admin/imagenes/:id", authMiddleware, upload.single("imagen"), imagenController.actualizar);
router.delete("/admin/imagenes/:id", authMiddleware, imagenController.eliminar);
router.get("/admin/carrusel/imagenes", authMiddleware, imagenController.obtenerTodas);
router.post("/admin/carrusel/imagenes", authMiddleware, upload.single("imagen"), imagenController.crear);
router.put("/admin/carrusel/imagenes/:id", authMiddleware, upload.single("imagen"), imagenController.actualizar);
router.delete("/admin/carrusel/imagenes/:id", authMiddleware, imagenController.eliminar);
router.patch("/admin/carrusel/reordenar", authMiddleware, imagenController.reordenar);

module.exports = router;
