const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        await usuario.update(req.body);
        res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        await usuario.destroy();
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);

        // Solo un admin puede crear otro admin
        if (req.body.rol && req.body.rol === "admin") {
            return res.status(403).json({ mensaje: "No tienes permisos para crear un administrador" });
        }

        const usuario = await Usuario.create(req.body);
        res.json({ mensaje: "Usuario registrado correctamente", usuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.body.email } });
        if (!usuario || !(await bcrypt.compare(req.body.password, usuario.password))) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, // Ahora el token incluye el rol
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ mensaje: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};