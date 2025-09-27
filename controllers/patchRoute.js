const Note = require('../models/structure2');

// Update note (PATCH)
async function patchNote(req, res) {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id }, // user owns it
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ success: false, message: "Note not found or not authorized" });
    res.json({ success: true, note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating note" });
  }
}

module.exports = { patchNote };
