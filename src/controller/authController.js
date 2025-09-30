import authService from "../service/authService.js";

async function getRegisterPage(req, res) {
    res.render('auth/register');
}

async function register(req, res) {
    try {
        const userData = req.body;
        console.log("Data user yang diterima:", userData);
        const {user,token} = await authService.registerUser(userData);
        req.session.user = user;
        req.session.token = token;
        console.log("Session setelah login:", req.session);
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        console.log("Data user yang diterima:", username, password);
        const {user,token} = await authService.loginUser(username, password);
        req.session.user = user;
        req.session.token = token;
        console.log("Session setelah login:", req.session);
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getLoginPage(req, res) {
    res.render('auth/login');
}

function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.redirect('/login');
    });
}

export default {
    register,
    login,
    getRegisterPage,
    getLoginPage,
    logout
}