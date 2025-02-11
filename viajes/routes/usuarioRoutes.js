const express = require("express");
const { register, login, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Autenticación
router.post("/register", register);
router.post("/login", login);

// CRUD de Usuarios
router.get("/", auth, getAllUsuarios);
router.get("/:id", auth, getUsuarioById);
router.put("/:id", auth, updateUsuario);
router.delete("/:id", auth, deleteUsuario);

module.exports = router;
