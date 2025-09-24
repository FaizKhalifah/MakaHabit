import mongoose from "mongoose";
import { Schema } from "mongoose";

const habitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, 
    description: { type: String },
    frequency: { 
        type: String, 
        enum: ["daily", "weekly", "monthly"], 
        default: "daily" 
    },
    order: {
        type: Number,
        default: 0
    },
    startDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;