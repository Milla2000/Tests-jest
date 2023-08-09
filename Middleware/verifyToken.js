const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.json({ message: "Access Denied, login to get access" });
    }

    const verified = jwt.verify(token, process.env.SECRET);
    req.info = verified;
    next();
  } catch (error) {
    return res.json({ message: "Invalid Token" });
  }
};

module.exports = {
  verifyToken,
};
