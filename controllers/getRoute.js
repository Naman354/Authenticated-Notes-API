const Note = require('../models/structure2');

// Get all notes for logged-in user
async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    console.log("Current logged-in user:", req.user);
    res.json({ success: true, notes });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
}

module.exports = { getAllNotes, getNoteById };
