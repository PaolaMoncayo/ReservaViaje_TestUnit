const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Viaje = sequelize.define("Viaje", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    destino: { type: DataTypes.STRING, allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    disponibilidad: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Viaje;
