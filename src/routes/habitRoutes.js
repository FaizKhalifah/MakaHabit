import habitController from "../controller/habitController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const habitRouter = express.Router();

habitRouter.get('/', authMiddleware, habitController.index);
habitRouter.get('/create', authMiddleware, habitController.getCreatePage);
habitRouter.get('/edit/:id', authMiddleware, habitController.getEditPage);
habitRouter.post('/create', authMiddleware, habitController.createHabit);
habitRouter.post('/update/:id', authMiddleware, habitController.updateHabit);
habitRouter.post('/delete/:id', authMiddleware, habitController.deleteHabit);
habitRouter.post('/archive/:id', authMiddleware, habitController.archiveHabit);

export default habitRouter;