const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    totpSecret: {
      type: String,
      default: "",
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    dailyGoal: {
      type: Number,
      default: 10,
    },

    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);