import habitLogController from "../controller/habitLogController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const habitLogRouter = express.Router();

habitLogRouter.get("/",authMiddleware.isAuthenticated,habitLogController.getAllHabitLogsPage);

export default habitLogRouter;