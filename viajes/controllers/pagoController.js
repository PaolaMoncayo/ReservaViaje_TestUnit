const Pago = require("../models/Pago");
const Reserva = require("../models/Reserva");

exports.getAllPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll({ include: [Reserva] });
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id, { include: [Reserva] });
        if (!pago) return res.status(404).json({ mensaje: "Pago no encontrado" });
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPago = async (req, res) => {
    try {
        const { reservaId, monto } = req.body;

        const reserva = await Reserva.findByPk(reservaId);
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });

        const pago = await Pago.create({ reservaId, monto, estado: "completado" });

        res.json({ mensaje: "Pago realizado con éxito", pago });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) return res.status(404).json({ mensaje: "Pago no encontrado" });

        await pago.update(req.body);
        res.json({ mensaje: "Pago actualizado", pago });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePago = async (req, res) => {
    try {
        const pago = await Pago.findByPk(req.params.id);
        if (!pago) return res.status(404).json({ mensaje: "Pago no encontrado" });

        await pago.destroy();
        res.json({ mensaje: "Pago eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
