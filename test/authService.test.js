// authService.test.js
import authService from "../src/service/authService.js";
import userRepositories from "../src/repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock semua dependency eksternal
jest.mock("../src/repositories/userRepositories.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // === TEST REGISTER ===
  test("registerUser should hash password, save user, and return token", async () => {
    const mockUserData = { username: "faiz", email: "faiz@example.com", password: "12345" };
    const mockHashed = "hashedpassword";
    const mockSavedUser = { id: "1", username: "faiz", email: "faiz@example.com" };
    const mockToken = "mock.jwt.token";

    // Mock bcrypt dan jwt
    bcrypt.hash.mockResolvedValue(mockHashed);
    userRepositories.createUser.mockResolvedValue(mockSavedUser);
    jwt.sign.mockReturnValue(mockToken);

    const result = await authService.registerUser(mockUserData);

    expect(bcrypt.hash).toHaveBeenCalledWith("12345", 10);
    expect(userRepositories.createUser).toHaveBeenCalledWith({
      username: "faiz",
      email: "faiz@example.com",
      password: mockHashed
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockSavedUser.id, username: mockSavedUser.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    expect(result).toEqual({ user: mockSavedUser, token: mockToken });
  });

  test("registerUser should throw error if missing fields", async () => {
    await expect(authService.registerUser({ username: "faiz" }))
      .rejects
      .toThrow("Username, email, and password are required");
  });

  // === TEST LOGIN ===
  test("loginUser should verify password and return token", async () => {
    const mockUser = { id: "1", username: "faiz", password: "hashed123" };
    const mockToken = "mock.jwt.token";

    userRepositories.findByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue(mockToken);

    const result = await authService.loginUser("faiz", "12345");

    expect(userRepositories.findByUsername).toHaveBeenCalledWith("faiz");
    expect(bcrypt.compare).toHaveBeenCalledWith("12345", "hashed123");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "1", username: "faiz" },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    expect(result).toEqual({ user: mockUser, token: mockToken });
  });

  test("loginUser should throw error if user not found", async () => {
    userRepositories.findByUsername.mockResolvedValue(null);
    await expect(authService.loginUser("unknown", "12345"))
      .rejects
      .toThrow("User not found");
  });

  test("loginUser should throw error if password invalid", async () => {
    const mockUser = { id: "1", username: "faiz", password: "hashed123" };
    userRepositories.findByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.loginUser("faiz", "wrongpass"))
      .rejects
      .toThrow("Invalid password");
  });
});
