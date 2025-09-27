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

    if (habit.user._id.toString() !== userId.toString()) {
        throw new Error("Unauthorized to update this habit");
    }

    const updatedHabit = await habitRepositories.updateHabit(habitId, data);
    return updatedHabit;
}

async function deleteHabit(userId, habitId) {
    console.log("delete habit masuk ke service")
    console.log("user id yang dikirim : ", userId);
    const habit = await habitRepositories.getHabitById(habitId);
    if (!habit) {
        throw new Error("Habit not found");
    }
    console.log("habit ditemukan ", habit)
    console.log("id user habit ",habit.user._id.toString())
    if (habit.user._id.toString() !== userId.toString()) {
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

async function getHabitbyId(habitId) {
    const habit = await habitRepositories.getHabitById(habitId);
    return habit;
}

async function archiveHabit(userId, habitId) {
  const habit = await habitRepositories.getHabitById(habitId);

  if (!habit) {
    throw new Error("Habit not found");
  }

  if (habit.user._id.toString() !== userId.toString()) {
    throw new Error("Unauthorized to archive this habit");
  }

  const updatedHabit = await habitRepositories.updateHabit(habitId, { isActive: false });
  return updatedHabit;
}

async function reorderHabits(userId, order) {
  console.log("masuk ke reorder service");
  for (let i = 0; i < order.length; i++) {
    await habitRepositories.updateOrder(i,userId, order);
  }
}

async function sortHabitByOrder(userId){
    const sortedHabits = await habitRepositories.sortHabitByOrder(userId);
    return sortedHabits;
}



export default {
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitsByUser,
    getHabitbyId,
    archiveHabit,
    reorderHabits,
    sortHabitByOrder
}
