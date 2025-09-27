const Note = require('../models/structure2'); // your Note/User schema
const { restrictToLoggedInUserOnly } = require('../middleware/autho');

// Get all notes for logged-in user
async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    res.json({ success: true, notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
}

// Get a single note by id
async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });
    res.json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching note" });
  }
}

module.exports = { getAllNotes, getNoteById };
