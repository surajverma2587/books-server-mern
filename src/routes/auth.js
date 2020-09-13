const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const { AUTH_SECRET } = require("../config");

const router = express.Router();

const validate = (body) => {
  const { firstName, lastName, email, password } = body;

  const isValid = firstName && lastName && email && password;

  return isValid;
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (validate(req.body)) {
    const user = await db.User.findOne({ email });
    console.log(user);
    if (user) {
      res.status(303).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      await db.User.create({
        email: email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password: passwordHash,
      });

      res.status(201).json({
        success: true,
        message: `Account has been created for ${email}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await db.User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: `Account with email ${email} does not exist`,
      });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const authToken = await jwt.sign(
          { id: user._id, email: user.email },
          AUTH_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({ success: true, token: authToken });
      } else {
        res.status(401).json({
          success: false,
          message: "Failed user authentication",
        });
      }
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
};

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
