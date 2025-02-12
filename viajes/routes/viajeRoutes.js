const express = require("express");
const { getAllViajes, getViajeById, createViaje, updateViaje, deleteViaje } = require("../controllers/viajeController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin"); // Importamos el middleware de administrador

const router = express.Router();

router.get("/", getAllViajes);
router.get("/:id", getViajeById);

// Solo los administradores pueden acceder a estas rutas
router.post("/", auth, admin, createViaje);
router.put("/:id", auth, admin, updateViaje);
router.delete("/:id", auth, admin, deleteViaje);

module.exports = router;