import habitService from "../service/habitService.js";

async function index(req, res) {
    try {
        const userId = req.session.user.id;
        const habits = await habitService.getHabitsByUser(userId);
        res.render('habits/index', { habits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCreatePage(req, res) {
    res.render('habits/create');
}

async function createHabit(req, res) {
    try {
        const userId = req.session.user.id;
        const habitData = req.body;
        const habit = await habitService.createHabit(userId, habitData);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getEditPage(req, res) {
    const habitId = req.params.id;
    res.render('habits/edit', { habitId });
}

async function updateHabit(req, res) {
    try {
        const userId = req.session.user.id;
        const habitId = req.params.id;
        const habitData = req.body;
        const updatedHabit = await habitService.updateHabit(userId, habitId, habitData);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteHabit(req, res) {
    try {
        const userId = req.session.user.id;
        const habitId = req.params.id;
        await habitService.deleteHabit(userId, habitId);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function archiveHabit(req, res) {
    try {
        const userId = req.session.user.id;
        const habitId = req.params.id;
        await habitService.archiveHabit(userId, habitId);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    index,
    createHabit,
    updateHabit,
    deleteHabit,
    getCreatePage,
    getEditPage,
    archiveHabit
}