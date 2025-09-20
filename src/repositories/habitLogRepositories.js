import HabitLog from "../models/habitLog";

async function createLog(logData) {
    const log = new HabitLog(logData);
    return await log.save();
}

async function getLogsByHabit(habitId) {
    return await HabitLog.find({ habit: habitId }).sort({ date: -1 });
}

async function getLogsByUser(userId) {
    return await HabitLog.find({ user: userId }).populate("habit").sort({ date: -1 });
}

async function getLogById(logId) {
    return await HabitLog.findById(logId).populate("habit");
}

async function updateLog(logId, updateData) {
    return await HabitLog.findByIdAndUpdate(logId, updateData, { new: true });
}

async function deleteLog(logId) {
    return await HabitLog.findByIdAndDelete(logId);
}

export default {
    createLog,
    getLogsByHabit,
    getLogById,
    getLogsByUser,
    updateLog,
    deleteLog
};