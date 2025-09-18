import { name } from "ejs";
import habitRepositories from "../repositories/habitRepositories.js";

async function createHabit(userId, data) {
    if(!data.title || !data.frequency) {
        throw new Error("Habit title and frequency are required");
    }

    const habitData = {
        user:userId,
        title: data.title,
        description: data.description || "",
        frequency: data.frequency,
        startDate: data.startDate || Date.now(),
        isActive : true
    }

    const habit = await habitRepositories.createHabit(habitData);
    return habit;
}

async function updateHabit(userId, habitId, data) {
    const habit = await habitRepositories.getHabitById(habitId);

    if (!habit) {
        throw new Error("Habit not found");
    }

    if (habit.userId.toString() !== userId.toString()) {
        throw new Error("Unauthorized to update this habit");
    }

    const updatedHabit = await habitRepositories.updateHabit(habitId, data);
    return updatedHabit;
}

async function deleteHabit(userId, habitId) {
    const habit = await habitRepositories.getHabitById(habitId);
    if (!habit) {
        throw new Error("Habit not found");
    }

    if (habit.userId.toString() !== userId.toString()) {
        throw new Error("Unauthorized to delete this habit");
    }

    await habitRepositories.deleteHabit(habitId);
    return { message: "Habit deleted successfully" };
}

async function getHabitsByUser(userId) {
    console.log("userId di service:", userId);
  const habits = await habitRepositories.getHabitsByUser(userId);
  return habits;
}

async function archiveHabit(userId, habitId) {
  const habit = await habitRepositories.getHabitById(habitId);

  if (!habit) {
    throw new Error("Habit not found");
  }

  if (habit.userId.toString() !== userId.toString()) {
    throw new Error("Unauthorized to archive this habit");
  }

  const updatedHabit = await habitRepositories.updateHabit(habitId, { isActive: false });
  return updatedHabit;
}

export default {
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitsByUser,
    archiveHabit
}
