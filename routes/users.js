const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by email
router.get("/:email", async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Create a new user
router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    const response = await User.create(user);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// Update user by ID
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user by ID (partial update)
router.patch("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
