import authRouter from "./authRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const indexRouter = express.Router();


indexRouter.get('/', authMiddleware.isAuthenticated,(req, res) => {
    res.render('home');
});
indexRouter.use('/auth', authRouter);

export default indexRouter;