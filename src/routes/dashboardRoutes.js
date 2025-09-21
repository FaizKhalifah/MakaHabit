import express from "express";
import dashboardController from "../controller/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const dashboardRouter = express.Router();

// hanya user yang login bisa lihat dashboard
dashboardRouter.get("/", authMiddleware.isAuthenticated, dashboardController.getDashboard);

export default dashboardRouter;
