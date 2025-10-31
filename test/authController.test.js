import authController from "../src/controller/authController.js";
import authService from "../src/service/authService.js";

jest.mock("../src/service/authService.js");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      session: {},
    };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // === RENDER PAGE ===
  test("getRegisterPage should render register page", async () => {
    await authController.getRegisterPage(req, res);
    expect(res.render).toHaveBeenCalledWith("auth/register");
  });

  test("getLoginPage should render login page", async () => {
    await authController.getLoginPage(req, res);
    expect(res.render).toHaveBeenCalledWith("auth/login");
  });

  // === REGISTER ===
  test("register should call authService.registerUser and redirect", async () => {
    const mockUser = { id: 1, username: "faiz" };
    const mockToken = "mock.jwt";
    req.body = { username: "faiz", email: "faiz@example.com", password: "12345" };

    authService.registerUser.mockResolvedValue({ user: mockUser, token: mockToken });

    await authController.register(req, res);

    expect(authService.registerUser).toHaveBeenCalledWith(req.body);
    expect(req.session.user).toEqual(mockUser);
    expect(req.session.token).toBe(mockToken);
    expect(res.redirect).toHaveBeenCalledWith("/habits");
  });

  test("register should handle errors", async () => {
    req.body = { username: "faiz" };
    authService.registerUser.mockRejectedValue(new Error("Missing fields"));

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing fields" });
  });

  // === LOGIN ===
  test("login should call authService.loginUser and redirect", async () => {
    const mockUser = { id: 1, username: "faiz" };
    const mockToken = "mock.jwt";
    req.body = { username: "faiz", password: "12345" };

    authService.loginUser.mockResolvedValue({ user: mockUser, token: mockToken });

    await authController.login(req, res);

    expect(authService.loginUser).toHaveBeenCalledWith("faiz", "12345");
    expect(req.session.user).toEqual(mockUser);
    expect(req.session.token).toBe(mockToken);
    expect(res.redirect).toHaveBeenCalledWith("/habits");
  });

  test("login should handle errors", async () => {
    req.body = { username: "faiz", password: "wrongpass" };
    authService.loginUser.mockRejectedValue(new Error("Invalid password"));

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid password" });
  });

  // === LOGOUT ===
  test("logout should destroy session and redirect", () => {
    req.session.destroy = jest.fn(cb => cb(null));

    authController.logout(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("login");
  });

  test("logout should handle destroy error", () => {
    req.session.destroy = jest.fn(cb => cb(new Error("Failed")));

    authController.logout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Logout failed" });
  });
});