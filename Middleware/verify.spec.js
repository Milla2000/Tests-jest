const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware"); // Path to your authMiddleware file

// Mock the required modules
jest.mock("jsonwebtoken");
jest.mock("dotenv");

// Mock the request, response, and next function
const req = { headers: {} };
const res = { json: jest.fn() };
const next = jest.fn();

describe("verifyToken Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  it("should verify a valid token and call next", async () => {
    const token = "validToken";
    req.headers["token"] = token;

    jwt.verify.mockReturnValue({ userId: 123 });

    await authMiddleware.verifyToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.SECRET);
    expect(req.info).toEqual({ userId: 123 });
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled(); // Ensure res.json is not called
  });

  it("should return 'Access Denied' if token is missing", async () => {
    await authMiddleware.verifyToken(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: "Access Denied, login to get access",
    });
    expect(next).not.toHaveBeenCalled(); // Ensure next is not called
  });

  it("should return 'Invalid Token' if token verification fails", async () => {
    req.headers["token"] = "invalidToken";

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authMiddleware.verifyToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("invalidToken", process.env.SECRET);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid Token" });
    expect(next).not.toHaveBeenCalled(); // Ensure next is not called
  });
});
