import habitLogRepositories from "../repositories/habitLogRepositories.js";
import habitRepositories from "../repositories/habitRepositories.js";
import generateWeeks from "../utils/generateWeeks.js";

async function addLog(userId, habitId, status) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Cek kalau sudah ada log untuk hari ini
    const existingLog = await HabitLog.findOne({ user: userId, habit: habitId, date: today });
    if (existingLog) {
        throw new Error("Log for today already exists");
    }

    const logData = {
        user: userId,
        habit: habitId,
        status, // misal: "completed", "skipped"
        date: today
    };

    return await habitLogRepositories.createLog(logData);
}

async function getUserLogs(userId) {
    return await habitLogRepositories.getLogsByUser(userId);
}

async function getHabitLogs(habitId) {
    return await habitLogRepositories.getLogsByHabit(habitId);
}

async function updateLog(logId, status) {
    return await habitLogRepositories.updateLog(logId, { status });
}

async function deleteLog(logId) {
    return await habitLogRepositories.deleteLog(logId);
}

async function getLog(logId) {
    return await habitLogRepositories.getLogById(logId);
}

async function getHabitLogCalendar(habitId) {
  // cari habitnya
  const habit = await habitRepositories.getHabitById(habitId);
  if (!habit) throw new Error("Habit not found");

  // ambil semua log habit
  const logs = await habitLogRepositories.getLogsByHabit(habitId);

  // range tanggal: mulai dari startDate habit sampai hari ini
  const startDate = new Date(habit.startDate);
  const endDate = new Date();

  const weeks = generateWeeks(startDate, endDate, logs);

  return { habit, weeks };
}

export default {
    addLog,
    getUserLogs,
    getHabitLogs,
    getHabitLogCalendar,
    updateLog,
    deleteLog,
    getLog
};
