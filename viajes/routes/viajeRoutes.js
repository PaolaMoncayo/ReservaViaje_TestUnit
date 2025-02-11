const express = require("express");
const { getAllViajes, getViajeById, createViaje, updateViaje, deleteViaje } = require("../controllers/viajeController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllViajes);
router.get("/:id", getViajeById);
router.post("/", auth, createViaje);
router.put("/:id", auth, updateViaje);
router.delete("/:id", auth, deleteViaje);

module.exports = router;
