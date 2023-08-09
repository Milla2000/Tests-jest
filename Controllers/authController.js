const mssql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4 } = require("uuid");
const { createEmployeeTable } = require("../Database/Tables/createTable");
const { sqlConfig } = require("../Config/config");
const { loginValidation, registerValidation } = require("../validators/employeeValidators");

const registerUser = async (req, res) => {
  try {
    // createEmployeeTable();

    const id = v4();
    // console.log(id);
    const { e_name, email, password } = req.body;
    
    if (!e_name || !email || !password) {
      return res.status(400).json({
        error: "Please input all values",
      });
    }

    const { error } = registerValidation.validate(req.body);
    
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    const hashedPwd = await bcrypt.hash(password, 5);
    // console.log("logged in");

    const pool = await mssql.connect(sqlConfig);
    // console.log(pool);

    console.log(id);
    if (pool.connected) {
      const result = await pool
        .request()
        .input("id", id)
        .input("e_name", mssql.VarChar, e_name)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, hashedPwd)
        .execute("registerEmployeePROC");

      // console.log(result);

      if (result.rowsAffected == 1) {
        const insertedData = {
          id: id,
          e_name: e_name,
          email: email,
          password: hashedPwd,
        };

        return res.status(200).json({
          message: "User created Successfully",
          // data: insertedData, //insertedData is the data that was inserted into the database
        });
      } else {
        return res.json({ message: "Creation failed" });
      }
    }
  } catch (error) {
    return res.json({ Error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        error: "Please input all values",
      });
    }

    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const pool = await mssql.connect(sqlConfig);

    const result = (
      await pool.request().input("email", email).execute("employeeLoginProc")
    );
    console.log(result);

    
    if (result.rowsAffected == 1) {
      
      const user = result.recordset[0];
      console.log("user", user)

      const hashedPwd = user.password;
      const isMatch = await bcrypt.compare(password, hashedPwd);
      // console.log(isMatch);
      if (isMatch) {
        const { password, ...payload } = user;
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "36000s",
        });
        return res.status(200).json({ message: "Login Successful", token });
      } 
      else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      // console.log("invalid email");
      return res.status(400).json({ message: "Email does not exist" });
    }
  } catch (error) {
    // console.log("invalid error");
    return res.json({ Error: error });
    
  }
};


// The crypto module is a built-in Node.js module that provides 
// cryptographic functionality, including generating random
//  bytes, creating hashes, and encryption
const checkUser = async (req, res) => {
  if (req.info) {
    res.json({
      info: req.info,
      // name:req.info.e_name,
      // email: req.info.email,
      // role: req.info.role
    });
  }
};

const generateBytes = () => {
  // When you run this code below, it will log 20 random bytes to the 
  // console and also return the bytes as a buffer
  const bytes = crypto.randomBytes(20);
  console.log(bytes)
  return bytes;
};
 generateBytes();//calls the function 

module.exports = {
  registerUser,
  loginUser,
  generateBytes,
  checkUser,
};
