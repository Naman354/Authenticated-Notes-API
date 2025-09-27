const Note = require('../models/structure2');

// Create a new note
async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const note = await Note.create({
      title,
      content,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error creating note" });
  }
}

module.exports = { createNote };
