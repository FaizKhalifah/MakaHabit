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

async function markHabitDone(req, res) {
  try {
    const userId = req.session.user._id;
    const habitId = req.params.habitId;
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0]; // YYYY-MM-DD only
    console.log("habit from params : ", habitId)
    const markedHabit = await habitLogService.markHabitDone(userId, habitId, todayDate);
    console.log("marked habit ", markedHabit);
    res.redirect("/habitLogs"); // arahkan balik ke halaman habit logs
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


export default {
    createLog,
    getAllHabitLogsPage,
    markHabitDone,
    updateLog
};
