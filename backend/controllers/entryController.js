const Entry = require("../models/Entry");

// ===============================
// CREATE ENTRY
// ===============================
const createEntry = async (req, res) => {
  try {
    const { brand, price, quantity, trigger } = req.body;

    if (!brand || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Brand and Price are required",
      });
    }

    const entry = await Entry.create({
      brand: brand.trim(),
      price: Number(price),
      quantity: quantity ? Number(quantity) : 1,
      trigger: trigger?.trim() || "Not specified",
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      entry,
    });
  } catch (err) {
    console.error("Create entry error:", err);

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

    res.status(200).json({
      success: true,
      entries,
    });
  } catch (err) {
    console.error("Get entries error:", err);

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

    const { brand, price, quantity, trigger } = req.body;

    if (brand !== undefined) {
      entry.brand = brand.trim();
    }

    if (price !== undefined) {
      entry.price = Number(price);
    }

    if (quantity !== undefined) {
      entry.quantity = Number(quantity);
    }

    if (trigger !== undefined) {
      entry.trigger = trigger.trim();
    }

    await entry.save();

    res.status(200).json({
      success: true,
      entry,
    });
  } catch (err) {
    console.error("Update entry error:", err);

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

    res.status(200).json({
      success: true,
      message: "Entry deleted",
    });
  } catch (err) {
    console.error("Delete entry error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// EXPORTS
// ===============================
module.exports = {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
};