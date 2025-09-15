import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

async function registerUser(userData) {

    if(!userData.username || !userData.email || !userData.password) {
        throw new Error("Username, email, and password are required");
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return await userRepositories.createUser(userData);
}

async function loginUser(username, password) {
    const users = await userRepositories.getAllUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return user;
}

export default {
    registerUser,
    loginUser
}