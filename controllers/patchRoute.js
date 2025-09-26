const Note = require('../models/structure');

// Partial update of a note
async function patchNote(req, res) {
  try {
    const updateFields = req.body; // only update provided fields

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      updateFields,
      { new: true }
    );

    if (!note) return res.status(404).json({ success: false, message: "Note not found or unauthorized" });

    res.json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating note" });
  }
}

module.exports = { patchNote };
