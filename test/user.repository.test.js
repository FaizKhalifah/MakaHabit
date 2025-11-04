import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userRepositories from "../src/repositories/userRepositories.js";
import User from "../src/models/user.js";

// Mock model Mongoose
jest.mock("../src/models/user.js");

describe("User Repository (Mocked Mongoose)", () => {

  beforeEach(() => {
    jest.clearAllMocks(); // reset mock antar test
  });

  test("createUser should create and save a new user", async () => {
    const mockUserData = { username: "faiz", password: "12345" };
    const mockSavedUser = { _id: "1", ...mockUserData };

    // Mock behavior dari constructor dan .save()
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSavedUser)
    }));

    const result = await userRepositories.createUser(mockUserData);
    expect(result).toEqual(mockSavedUser);
  });

  test("getAllUsers should return all users", async () => {
    const mockUsers = [
      { _id: "1", username: "faiz" },
      { _id: "2", username: "khalifah" }
    ];
    User.find.mockResolvedValue(mockUsers);

    const result = await userRepositories.getAllUsers();
    expect(result).toEqual(mockUsers);
    expect(User.find).toHaveBeenCalledTimes(1);
  });

  test("getUserById should return a user by ID", async () => {
    const mockUser = { _id: "123", username: "faiz" };
    User.findById.mockResolvedValue(mockUser);

    const result = await userRepositories.getUserById("123");
    expect(result).toEqual(mockUser);
    expect(User.findById).toHaveBeenCalledWith("123");
  });

  test("findByUsername should return user with specific username", async () => {
    const mockUser = { _id: "456", username: "faiz" };
    User.findOne.mockResolvedValue(mockUser);

    const result = await userRepositories.findByUsername("faiz");
    expect(result).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ username: "faiz" });
  });

  test("updateUser should update a user and return new data", async () => {
    const mockUpdatedUser = { _id: "1", username: "faiz", password: "newpass" };
    User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

    const result = await userRepositories.updateUser("1", { password: "newpass" });
    expect(result).toEqual(mockUpdatedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("1", { password: "newpass" }, { new: true });
  });

  test("deleteUser should delete a user by ID", async () => {
    const mockDeletedUser = { _id: "1", username: "faiz" };
    User.findByIdAndDelete.mockResolvedValue(mockDeletedUser);

    const result = await userRepositories.deleteUser("1");
    expect(result).toEqual(mockDeletedUser);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith("1");
  });
});