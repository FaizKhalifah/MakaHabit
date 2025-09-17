import authRouter from "./authRoutes.js";
import habitRouter from "./habitRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const indexRouter = express.Router();


indexRouter.get('/', authMiddleware.isAuthenticated,(req, res) => {
    res.render('home');
});
indexRouter.use('/auth', authRouter);
indexRouter.use('/habits', authMiddleware.isAuthenticated, habitRouter);

export default indexRouter;