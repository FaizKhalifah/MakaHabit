import Habit from "../models/habit.js";

async function createHabit(habitData) {
    const habit = new Habit(habitData);
    return await habit.save();
}

async function getHabitsByUser(userId) {
    console.log("userId di repo:", userId);
    const habits = await Habit.find({ user: userId });
    console.log("users di repo:", habits);
    return habits;
}

async function getHabitById(habitId) {
    return await Habit.findById(habitId);
}

async function getAllHabits() {
    return await Habit.find();
}

async function updateHabit(habitId, updateData) {
    return await Habit.findByIdAndUpdate(habitId, updateData, { new: true });
}

async function deleteHabit(habitId) {
    return await Habit.findByIdAndDelete(habitId);
}

export default {
    createHabit,
    getHabitsByUser,
    getHabitById,
    getAllHabits,
    updateHabit,
    deleteHabit
}   



