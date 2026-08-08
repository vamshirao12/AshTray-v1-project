const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  signup,
  login,
  getProfile,
  updateDailyGoal,
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.get("/me", protect, getProfile);

router.put(
  "/daily-goal",
  protect,
  updateDailyGoal
);

module.exports = router;