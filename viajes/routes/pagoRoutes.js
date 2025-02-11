const express = require("express");
const { getAllPagos, getPagoById, createPago, updatePago, deletePago } = require("../controllers/pagoController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllPagos);
router.get("/:id", auth, getPagoById);
router.post("/", auth, createPago);
router.put("/:id", auth, updatePago);
router.delete("/:id", auth, deletePago);

module.exports = router;
