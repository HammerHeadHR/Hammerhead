const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const formidable = require('express-formidable');
const { addDataset, getDataset, updateDataset, deleteDataset, getAllDatasets } = require('../../database/models/datasets.js');

router.post('/', (req, res) => {
  const results = [];
  let key = Object.keys(req.files)[0];
  let path = req.files[key].path;
  let { title, owner_id, team_id } = req.fields;

  fs.createReadStream(path)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let dbRes = await addDataset(results, title, owner_id, team_id);
        if (dbRes.rowCount === 1) {
          res.status(201).send('Added dataset');
        } else {
          res.status(400).send('Add dataset failed');
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    });
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let dbRes = await getDataset(id);
    res.send(dbRes.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    let dbRes = await getAllDatasets();
    res.send(dbRes.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/', (req, res) => {
  const results = [];
  let key = Object.keys(req.files)[0];
  let path = req.files[key].path;
  let { id, title, owner_id } = req.fields;

  fs.createReadStream(path)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let dbRes = await updateDataset(id, results, title, owner_id);
        if (dbRes.rowCount === 1) {
          res.status(201).send('Updated dataset');
        } else {
          res.status(400).send('Update dataset failed');
        }
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    });
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let dbRes = await deleteDataset(id);
    res.status(201).send(dbRes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
