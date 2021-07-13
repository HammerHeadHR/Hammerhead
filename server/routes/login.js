const express = require('express');
const router = express.Router();
const { } = require('../../database/models/notes.js');

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

module.exports = router;
