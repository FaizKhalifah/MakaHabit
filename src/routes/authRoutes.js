import express from 'express';
import authController from '../controller/authController.js';

const authRouter = express.Router();


authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/register', authController.getRegisterPage);
authRouter.get('/login', authController.getLoginPage);

export default authRouter;