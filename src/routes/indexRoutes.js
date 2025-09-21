import authRouter from "./authRoutes.js";
import habitRouter from "./habitRoutes.js";
import habitLogRouter from "./habitLogRoutes.js";
import dashboardRouter from "./dashboardRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const indexRouter = express.Router();


indexRouter.get('/', authMiddleware.isAuthenticated,(req, res) => {
    res.render('home');
});
indexRouter.use('/auth', authRouter);
indexRouter.use('/dashboard',authMiddleware.isAuthenticated,dashboardRouter);
indexRouter.use('/habits', authMiddleware.isAuthenticated, habitRouter);
indexRouter.use('/habitLogs',authMiddleware.isAuthenticated,habitLogRouter);

export default indexRouter;