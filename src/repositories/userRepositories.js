import User from "../models/user.js";

async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

async function getAllUsers() {
    return await User.find();
}

async function getUserById(userId) {
    return await User.findById(userId);
}

async function updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
}   

async function deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
}

export default{
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}