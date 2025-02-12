const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/viajes", require("./routes/viajeRoutes"));
app.use("/api/reservas", require("./routes/reservaRoutes"));
app.use("/api/pagos", require("./routes/pagoRoutes"));

const iniciarServidor = async () => {
    try {
        await sequelize.sync({ alter: true }); // Reiniciar la base de datos en cada inicio
        console.log("Base de datos sincronizada");
        app.listen(process.env.PORT, () => console.log(`Servidor en http://localhost:${process.env.PORT}`));
    } catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
    }
};

iniciarServidor();
