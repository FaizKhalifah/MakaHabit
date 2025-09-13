import mongoose from "mongoose";
import { Schema } from "mongoose";

const habitLogSchema = new mongoose.Schema({
    habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
    date: { type: Date, required: true }, // contoh: 2025-09-08
    status: { 
        type: String, 
        enum: ["done", "missed"], 
        default: "done" 
    }
})

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
export default HabitLog;