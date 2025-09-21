import express from "express";
import dashboardController from "../controller/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// hanya user yang login bisa lihat dashboard
router.get("/", authMiddleware.isAuthenticated, dashboardController.getDashboard);

export default router;
