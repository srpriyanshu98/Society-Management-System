import express from "express";
import {
	createAlert,
	getAllAlerts,
	getAlertById,
	updateAlert,
	deleteAlert,
} from "../controller/alertcontroller.js";

const router = express.Router();

router.post("/", createAlert);
router.get("/", getAllAlerts);
router.get("/:id", getAlertById);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
