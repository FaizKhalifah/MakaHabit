import habitService from "../service/habitService.js";

async function index(req, res) {
    try {
        const userId = req.session.user._id;
        const habits = await habitService.sortHabitByOrder(userId);
        console.log("habits:", habits);
        res.render('habits/index', { habits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getDetailPage(req,res) {
    const habitId = req.params.id;
    const habit = await habitService.getHabitbyId(habitId);
    res.render('habits/detail',{habit});
}

async function getCreatePage(req, res) {
    res.render('habits/create');
}

async function createHabit(req, res) {
    try {
        console.log("req session : ", req.session.user);
        const userId = req.session.user._id;
        const habitData = req.body;
        console.log("user id", userId)
        console.log("habit data:", habitData);
        const habit = await habitService.createHabit(userId, habitData);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getEditPage(req, res) {
    const habitId = req.params.id;
    const habit = await habitService.getHabitbyId(habitId);
    res.render('habits/edit', { habit });
}

async function updateHabit(req, res) {
    try {
        const userId = req.session.user._id;
        const habitId = req.params.id;
        const habitData = req.body;
        await habitService.updateHabit(userId, habitId, habitData);
        res.redirect('/habits');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteHabit(req, res) {
    try {
        const userId = req.session.user._id;
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

async function reorderHabits(req, res) {
  try {
    console.log("req di saat reorder ", req)
    const userId = req.session.user._id;
    const { order } = req.body; // array of habit IDs in new order

    await habitService.reorderHabits(userId, order);

    res.status(200).json({ message: "Habits reordered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


export default {
    index,
    getDetailPage,
    createHabit,
    updateHabit,
    deleteHabit,
    getCreatePage,
    getEditPage,
    archiveHabit,
    reorderHabits
}