const Reserva = require("../models/Reserva");
const Usuario = require("../models/Usuario");
const Viaje = require("../models/Viaje");

exports.getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ include: [Usuario, Viaje] });
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReservaById = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id, { include: [Usuario, Viaje] });
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReserva = async (req, res) => {
    try {
        const { usuarioId, viajeId } = req.body;

        //  1. Verificar que el usuario existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        //  2. Verificar que el viaje existe
        const viaje = await Viaje.findByPk(viajeId);
        if (!viaje) return res.status(404).json({ mensaje: "Viaje no encontrado" });

        //  3. Verificar disponibilidad
        if (viaje.disponibilidad <= 0) return res.status(400).json({ mensaje: "No hay disponibilidad para este viaje" });

        //  4. Crear la reserva con estado "pendiente"
        const reserva = await Reserva.create({ usuarioId, viajeId, estado: "pendiente" });

        //  5. Reducir disponibilidad del viaje
        await viaje.update({ disponibilidad: viaje.disponibilidad - 1 });

        res.json({ mensaje: "Reserva creada con éxito", reserva });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });

        await reserva.update(req.body);
        res.json({ mensaje: "Reserva actualizada", reserva });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });

        await reserva.destroy();
        res.json({ mensaje: "Reserva eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
