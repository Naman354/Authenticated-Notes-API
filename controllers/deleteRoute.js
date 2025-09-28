const Note = require('../models/structure2');


async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id, 
    });

    if (!note) return res.status(404).json({ success: false, message: "Note not found or not authorized" });
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting note" });
  }
}

module.exports = { deleteNote };
