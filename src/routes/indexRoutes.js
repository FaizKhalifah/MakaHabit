import authRouter from "./authRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.get('/', authMiddleware.isAuthenticated,(req, res) => {
    res.render('home');
});

export default indexRouter;