const { Router } = require("express");
const { registerUser, loginUser, checkUser } = require("../Controllers/authController");
const { verifyToken } = require("../Middleware/verifyToken");

const employeerouter = Router();

employeerouter.post("/register", registerUser);
employeerouter.post("/login", loginUser);
// employeerouter.get("/check", verifyToken, checkUser);


module.exports = {
    employeerouter,
}