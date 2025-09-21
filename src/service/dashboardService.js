import habitRepositories from "../repositories/habitRepositories.js";
import habitLogRepositories from "../repositories/habitLogRepositories.js";
import generateWeeks from "../utils/generateWeeks.js";

async function getTodayStats(userId) {
  const habits = await habitRepositories.getHabitsByUser(userId);
  const today = new Date();
  today.setHours(0,0,0,0);

  let done = 0;
  for (const habit of habits) {
    const log = await habitLogRepositories.createOrUpdateLog({
      userId,
      habitId: habit._id,
      date: today,
      status: "missed" // jika tidak ada log maka dianggap missed
    });

    if (log.status === "done") done++;
  }

  return {
    done,
    total: habits.length,
    streak: 0, // TODO: hitung streak harian
    habitCount: habits.length
  };
}

async function getWeekStats(userId) {
  const habits = await habitRepositories.getHabitsByUser(userId);
  const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Senin

  let stats = weekDays.map(label => ({ label, done: 0, total: habits.length }));

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    for (const habit of habits) {
      const log = await habitLogRepositories.createOrUpdateLog({
        userId,
        habitId: habit._id,
        date,
        status: "missed"
      });

      if (log.status === "done") {
        stats[i].done++;
      }
    }
  }

  return stats;
}

// Heatmap 1 tahun
async function getYearlyHeatmap(userId) {
  const startDate = new Date(new Date().getFullYear(), 0, 1); // awal tahun
  const endDate = new Date(new Date().getFullYear(), 11, 31); // akhir tahun

  // ambil log dari DB
  const logs = await habitLogRepositories.getLogsByUser();

  // pastikan logs berisi {date, status}
  return generateWeeks(startDate, endDate, logs);
}

export default {
  getTodayStats,
  getWeekStats,
  getYearlyHeatmap
};