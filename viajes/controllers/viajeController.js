const Viaje = require("../models/Viaje");

exports.getAllViajes = async (req, res) => {
    try {
        const viajes = await Viaje.findAll();
        res.json(viajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getViajeById = async (req, res) => {
    try {
        const viaje = await Viaje.findByPk(req.params.id);
        if (!viaje) return res.status(404).json({ mensaje: "Viaje no encontrado" });
        res.json(viaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createViaje = async (req, res) => {
    try {
        const viaje = await Viaje.create(req.body);
        res.json(viaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateViaje = async (req, res) => {
    try {
        const viaje = await Viaje.findByPk(req.params.id);
        if (!viaje) return res.status(404).json({ mensaje: "Viaje no encontrado" });

        await viaje.update(req.body);
        res.json({ mensaje: "Viaje actualizado", viaje });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteViaje = async (req, res) => {
    try {
        const viaje = await Viaje.findByPk(req.params.id);
        if (!viaje) return res.status(404).json({ mensaje: "Viaje no encontrado" });

        await viaje.destroy();
        res.json({ mensaje: "Viaje eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
