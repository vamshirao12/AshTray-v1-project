const Entry = require("../models/Entry");

// ===============================
// CREATE ENTRY
// ===============================
const createEntry = async (req, res) => {
  try {
    const { brand, price, quantity } = req.body;

    if (!brand || !price) {
      return res.status(400).json({
        success: false,
        message: "Brand and Price are required",
      });
    }

    const entry = await Entry.create({
      brand,
      price,
      quantity: quantity || 1,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      entry,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// GET ALL ENTRIES
// ===============================
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      entries,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// UPDATE ENTRY
// ===============================
const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    const { brand, price, quantity } = req.body;

    if (brand !== undefined) entry.brand = brand;
    if (price !== undefined) entry.price = price;
    if (quantity !== undefined) entry.quantity = quantity;

    await entry.save();

    res.json({
      success: true,
      entry,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// DELETE ENTRY
// ===============================
const deleteEntry = async (req, res) => {
  try {

    const entry = await Entry.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    res.json({
      success: true,
      message: "Entry deleted",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
};const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// SIGNUP
// ==========================
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
     success: true,
     message: "Login Successful",
     token,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==========================
// GET PROFILE
// ==========================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// UPDATE DAILY GOAL
// ==========================
const updateDailyGoal = async (req, res) => {

  try {

    const { dailyGoal } = req.body;

    if (!dailyGoal || dailyGoal < 1) {
      return res.status(400).json({
        success: false,
        message: "Goal must be at least 1",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        dailyGoal,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json({
      success: true,
      user,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

module.exports = {
  signup,
  login,
  getProfile,
  updateDailyGoal,
};