const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Reserva = require("./Reserva");

const Pago = sequelize.define("Pago", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reservaId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Reserva, key: "id" }
    },
    monto: { type: DataTypes.FLOAT, allowNull: false },
    estado: { type: DataTypes.STRING, defaultValue: "pendiente" },
});

// Relaciones
Reserva.hasOne(Pago, { foreignKey: "reservaId" });
Pago.belongsTo(Reserva, { foreignKey: "reservaId" });

module.exports = Pago;
