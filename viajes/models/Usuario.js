const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
});

Usuario.beforeCreate(async (usuario) => {
    usuario.password = await bcrypt.hash(usuario.password, 10);
});

module.exports = Usuario;
