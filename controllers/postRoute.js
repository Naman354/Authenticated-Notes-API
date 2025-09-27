const Note = require('../models/structure2');

// Create a new note
async function createNote(req, res) {
  try {
        console.log("Logged-in user:", req.user);
        if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
    } 
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user._id, // logged-in user
    });

    await note.save();
    res.status(201).json({ success: true, note });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ success: false, message: "Error creating note" });
  }
}

module.exports = { createNote };
