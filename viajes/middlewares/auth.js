const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization"); // 🔍 Extraer token de `Authorization`
    if (!authHeader) return res.status(401).json({ mensaje: "Acceso denegado, token no proporcionado" });

    const token = authHeader.split(" ")[1]; // 🔍 Extraer solo el token sin "Bearer"
    if (!token) return res.status(401).json({ mensaje: "Token inválido o mal formado" });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET); // 🔍 Verificar el token
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: "Token inválido" });
    }
};
