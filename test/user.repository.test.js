import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userRepositories from "../src/repositories/userRepositories.js";
import User from "../src/models/user.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany(); // kosongkan koleksi sebelum tiap test
});

describe("User Repository", () => {
  it("should create a new user", async () => {
    const userData = { username: "faiz", email:"faizganteng13@gmail.com",password: "secret" };
    const user = await userRepositories.createUser(userData);

    expect(user).toHaveProperty("_id");
    expect(user.username).toBe("faiz");
    expect(user.email).toBe("faizganteng13@gmail.com");
  });

  it("should get all users", async () => {
    await userRepositories.createUser({ username: "a", email:"firstemail@gmail.com",password: "1" });
    await userRepositories.createUser({ username: "b", email:"secondemail@gmail.com", password: "2" });

    const users = await userRepositories.getAllUsers();
    expect(users.length).toBe(2);
  });

  it("should get user by ID", async () => {
    const newUser = await userRepositories.createUser({
      username: "findme",
      email:"findme@gmail.com",
      password: "123",
    });

    const foundUser = await userRepositories.getUserById(newUser._id);
    expect(foundUser.username).toBe("findme");
  });

  it("should find user by username", async () => {
    await userRepositories.createUser({ username: "lookup",email:"lookup@gmail.com", password: "abc" });

    const user = await userRepositories.findByUsername("lookup");
    expect(user).not.toBeNull();
    expect(user.username).toBe("lookup");
  });

  it("should update a user", async () => {
    const user = await userRepositories.createUser({ username: "update", email:"updateemail@gmail.com",password: "1" });

    const updated = await userRepositories.updateUser(user._id, { username: "AfterUpdate" });

    expect(updated.username).toBe("AfterUpdate");
  });

  it("should delete a user", async () => {
    const user = await userRepositories.createUser({ username: "delete", email:"deletedemail@gmail.com",password: "xyz" });

    await userRepositories.deleteUser(user._id);

    const found = await User.findById(user._id);
    expect(found).toBeNull();
  });
});
