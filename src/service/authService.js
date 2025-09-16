import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(userData) {

    if(!userData.username || !userData.email || !userData.password) {
        throw new Error("Username, email, and password are required");
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const User =  await userRepositories.createUser(userData);
    const token = jwt.sign({ id: User.id, username: User.username }, 'your_jwt_secret',{ expiresIn: '1h' });
    return { user: User, token };
}

async function loginUser(username, password) {
    const user = await userRepositories.findByUsername(username);
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    return { user, token };
}

export default {
    registerUser,
    loginUser
}