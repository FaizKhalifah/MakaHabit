import habitLogRepositories from "../repositories/habitLogRepositories.js";
import habitRepositories from "../repositories/habitRepositories.js";
import generateWeeks from "../utils/generateWeeks.js";


async function getHabitLogs(habitId) {
    return await habitLogRepositories.getLogsByHabit(habitId);
}

async function updateLog(logId, status) {
    return await habitLogRepositories.updateLog(logId, { status });
}

async function getLog(logId) {
    return await habitLogRepositories.getLogById(logId);
}

async function getAllHabitLogsByUser(userId) {
  // ambil semua habit user ini
  const habits = await habitRepositories.getHabitsByUser(userId);

  const results = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // 1 tahun ke belakang

  for (const habit of habits) {
    const logs = await habitLogRepositories.getLogsByHabit(habit._id);

    // generate struktur mingguan 1 tahun penuh
    const weeks = generateWeeks(startDate, endDate, logs);

    results.push({ habit, weeks });
  }

  return results;
}


async function markHabitDone(userId, habitId, date) {
  // buat atau update log untuk hari ini
  console.log("user id di service : ", userId);
  console.log("habit id di service : ", habitId);
  console.log("tanggal di service : ", date);
  return habitLogRepositories.createOrUpdateLog({
    userId,
    habitId,
    date,
    status: "done"
  });
}

export default {
    getHabitLogs,
    markHabitDone,
    getAllHabitLogsByUser,
    updateLog,
    getLog
};
