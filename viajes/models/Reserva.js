const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const Viaje = require("./Viaje");

const Reserva = sequelize.define("Reserva", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Usuario, key: "id" }
    },
    viajeId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Viaje, key: "id" }
    },
    estado: { type: DataTypes.STRING, defaultValue: "pendiente" },
});

// Relaciones
Usuario.hasMany(Reserva, { foreignKey: "usuarioId" });
Viaje.hasMany(Reserva, { foreignKey: "viajeId" });
Reserva.belongsTo(Usuario, { foreignKey: "usuarioId" });
Reserva.belongsTo(Viaje, { foreignKey: "viajeId" });

module.exports = Reserva;
