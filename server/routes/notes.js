const express = require('express');
const router = express.Router();
const { addNote, deleteNote, getNotes } = require('../../database/models/notes.js');

router.post('/', async (req, res) => {
  let { datasetId, ownerId, body } = req.body;
  try {
    let dbRes = await addNote(datasetId, ownerId, body);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Added note');
    } else {
      res.status(500).send('Add note failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:noteId', async (req, res) => {
  let { noteId } = req.params;
  try {
    let dbRes = await deleteNote(noteId);
    res.status(201).send(dbRes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:datasetId', async (req, res) => {
  let { datasetId } = req.params;
  try {
    let dbRes = await getNotes(datasetId);
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
