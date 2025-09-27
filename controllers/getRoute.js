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

// Get a single note by ID (only if created by logged-in user)
async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, note });
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ success: false, message: "Error fetching note" });
  }
}

module.exports = { getAllNotes, getNoteById };
