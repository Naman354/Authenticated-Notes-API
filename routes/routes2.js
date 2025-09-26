const express = require('express');
const router = express.Router();
const { restrictToLoggedInUserOnly } = require('../middleware/autho');

const { getAllNotes, getNoteById } = require('../controllers/getRoutes');
const { createNote } = require('../controllers/postRoutes');
const { updateNote } = require('../controllers/putRoutes');
const { patchNote } = require('../controllers/patchRoutes');
const { deleteNote } = require('../controllers/deleteRoutes');

// Apply middleware to all /notes routes
router.use(restrictToLoggedInUserOnly);

// CRUD routes
router.get("/notes", getAllNotes);
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.patch("/notes/:id", patchNote);
router.delete("/notes/:id", deleteNote);

module.exports = router;
