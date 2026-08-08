const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} = require("../controllers/entryController");

router
  .route("/")
  .get(protect, getEntries)
  .post(protect, createEntry);

router
  .route("/:id")
  .put(protect, updateEntry)
  .delete(protect, deleteEntry);

module.exports = router;