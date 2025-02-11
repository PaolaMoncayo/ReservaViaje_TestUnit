const express = require("express");
const { getAllReservas, getReservaById, createReserva, updateReserva, deleteReserva } = require("../controllers/reservaController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllReservas);
router.get("/:id", auth, getReservaById);
router.post("/", auth, createReserva);
router.put("/:id", auth, updateReserva);
router.delete("/:id", auth, deleteReserva);

module.exports = router;
