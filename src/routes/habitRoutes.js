import habitController from "../controller/habitController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const habitRouter = express.Router();

habitRouter.get('/', authMiddleware.isAuthenticated, habitController.index);
habitRouter.get('/:id',authMiddleware.isAuthenticated,habitController.getDetailPage);
habitRouter.get('/create', authMiddleware.isAuthenticated, habitController.getCreatePage);
habitRouter.post('/create', authMiddleware.isAuthenticated, habitController.createHabit);
habitRouter.get('/edit/:id', authMiddleware.isAuthenticated, habitController.getEditPage);
habitRouter.post('/edit/:id', authMiddleware.isAuthenticated, habitController.updateHabit);
habitRouter.post('/delete/:id', authMiddleware.isAuthenticated, habitController.deleteHabit);
habitRouter.post('/archive/:id', authMiddleware.isAuthenticated, habitController.archiveHabit);

export default habitRouter;