import HabitLog from "../models/habitLog.js";

async function getLogsByHabit(habitId) {
    return await HabitLog.find({ habit: habitId }).lean();
}

async function getLogsByUser(userId) {
    return await HabitLog.find({ user: userId }).lean();
}


async function updateLog(logId, updateData) {
    return await HabitLog.findByIdAndUpdate(logId, updateData, { new: true });
}


async function createOrUpdateLog({ userId, habitId, date, status }) {
let log = await HabitLog.findOne({ habit: habitId, date });
  if (log) {
    log.status = status;
    return log.save();
  }
  return HabitLog.create({ habit: habitId, date, status });
}


export default {
    getLogsByHabit,
    getLogsByUser,
    updateLog,
    createOrUpdateLog,
};