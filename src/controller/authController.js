import authService from "../service/authService.js";

async function getRegisterPage(req, res) {
    res.render('auth/register');
}

async function register(req, res) {
    try {
        const userData = req.body;
        const newUser = await authService.registerUser(userData);
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await authService.loginUser(username, password);
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getLoginPage(req, res) {
    res.render('auth/login');
}

export default {
    register,
    login,
    getRegisterPage,
    getLoginPage
}