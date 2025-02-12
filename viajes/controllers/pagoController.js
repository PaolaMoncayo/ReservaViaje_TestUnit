const Pago = require("../models/Pago");
const Reserva = require("../models/Reserva");
const Viaje = require("../models/Viaje"); 

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

        //  1. Buscar la reserva con el viaje asociado
        const reserva = await Reserva.findByPk(reservaId, { include: { model: Viaje } });
        if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });

        //  2. Verificar que el viaje está correctamente relacionado
        if (!reserva.Viaje) return res.status(404).json({ mensaje: "El viaje asociado no existe" });

        //  3. Validar si el monto es suficiente
        if (monto < reserva.Viaje.precio) {
            return res.status(400).json({ mensaje: `Monto insuficiente. Se requiere al menos $${reserva.Viaje.precio}.` });
        }

        //  4. Registrar el pago
        const pago = await Pago.create({ reservaId, monto, estado: "completado" });

        //  5. Actualizar el estado de la reserva a "confirmado"
        await reserva.update({ estado: "confirmado" });

        res.json({ mensaje: "Pago realizado con éxito y reserva confirmada", pago, reserva });
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
