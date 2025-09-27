const express = require('express');
const router = express.Router();
const { restrictToLoggedInUserOnly } = require('../middleware/autho');

// Import controllers
const { getAllNotes, getNoteById } = require('../controllers/getRoute');
const { createNote } = require('../controllers/postRoute');
const { updateNote } = require('../controllers/putRoute');
const { patchNote } = require('../controllers/patchRoute');
const { deleteNote } = require('../controllers/deleteRoute');

// Apply authentication middleware to all /notes routes
router.use(restrictToLoggedInUserOnly);

// CRUD routes (mounted at /notes in index.js)
router.get("/", getAllNotes);           // GET /notes
router.get("/:id", getNoteById);        // GET /notes/:id
router.post("/", createNote);           // POST /notes
router.put("/:id", updateNote);         // PUT /notes/:id
router.patch("/:id", patchNote);        // PATCH /notes/:id
router.delete("/:id", deleteNote);      // DELETE /notes/:id

module.exports = router;
