const Note = require('../models/structure2');

// Full update of a note
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Both title and content are required" });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title, content },
      { new: true } // return the updated document
    );

    if (!note) return res.status(404).json({ success: false, message: "Note not found or unauthorized" });

    res.json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating note" });
  }
}

module.exports = { updateNote };
