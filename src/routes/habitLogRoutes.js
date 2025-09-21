import habitLogController from "../controller/habitLogController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const habitLogRouter = express.Router();

habitLogRouter.get("/",authMiddleware.isAuthenticated,habitLogController.getAllHabitLogsPage);
habitLogRouter.post("/:habitId/done",authMiddleware.isAuthenticated,habitLogController.markHabitDone);

export default habitLogRouter;