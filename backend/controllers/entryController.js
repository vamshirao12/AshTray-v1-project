const Entry = require("../models/Entry");

// ==========================
// CREATE ENTRY
// ==========================
const createEntry = async (req, res) => {
  try {
    const {
      brand,
      price,
      quantity,
      trigger,
    } = req.body;

    // Validate required fields
    if (!brand || price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Brand and Price are required",
      });
    }

    const entry = await Entry.create({
      brand: brand.trim(),
      price: Number(price),
      quantity:
        quantity === undefined || quantity === null || quantity === ""
          ? 1
          : Number(quantity),

      // Save the reason/trigger selected by the user
      trigger:
        trigger && trigger.trim()
          ? trigger.trim()
          : "Not specified",

      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Entry Added",
      entry,
    });
  } catch (err) {
    console.error("CREATE ENTRY ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// GET ALL ENTRIES
// ==========================
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: entries.length,
      entries,
    });
  } catch (err) {
    console.error("GET ENTRIES ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// UPDATE ENTRY
// ==========================
const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    // Make sure the logged-in user owns this entry
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const {
      brand,
      price,
      quantity,
      trigger,
    } = req.body;

    // Update only supplied fields
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
      entry.trigger =
        trigger && trigger.trim()
          ? trigger.trim()
          : "Not specified";
    }

    await entry.save();

    res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      entry,
    });
  } catch (err) {
    console.error("UPDATE ENTRY ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================
// DELETE ENTRY
// ==========================
const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    // Make sure the logged-in user owns this entry
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ENTRY ERROR:", err);

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
};