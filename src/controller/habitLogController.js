import habitLogService from "../service/habitLogService.js";

async function createLog(req, res) {
    try {
        const userId = req.session.user._id;
        const { habitId, status } = req.body;
        await habitLogService.addLog(userId, habitId, status);
        res.redirect(`/habits/view/${habitId}`);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



async function getUserLogs(req, res) {
    try {
        const userId = req.session.user._id;
        const logs = await habitLogService.getUserLogs(userId);
        res.render("habitLogs/index", { logs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getHabitLogs(req, res) {
    try {
        const habitId = req.params.habitId;
        const logs = await habitLogService.getHabitLogs(habitId);
        res.render("habitLogs/habitLogs", { logs, habitId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateLog(req, res) {
    try {
        const { logId } = req.params;
        const { status } = req.body;
        await habitLogService.updateLog(logId, status);
        res.redirect("back");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteLog(req, res) {
    try {
        const { logId } = req.params;
        await habitLogService.deleteLog(logId);
        res.redirect("back");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllHabitLogsPage(req, res) {
  try {
    const userId = req.session.user._id; // ambil user dari session
    const habitLogs = await habitLogService.getAllHabitLogsByUser(userId);

    res.render("habitLogs/index", { habitLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


export default {
    createLog,
    getUserLogs,
    getHabitLogs,
    getAllHabitLogsPage,
    updateLog,
    deleteLog
};
