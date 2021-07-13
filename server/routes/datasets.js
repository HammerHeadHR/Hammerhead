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
  let { title, ownerId, teamId } = req.fields;

  fs.createReadStream(path)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let dbRes = await addDataset(results, title, ownerId, teamId);
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

router.get('/:datasetId', async (req, res) => {
  let datasetId = req.params.datasetId;
  try {
    let dbRes = await getDataset(datasetId);
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
  let { datasetId, title, owner } = req.fields;

  fs.createReadStream(path)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let dbRes = await updateDataset(datasetId, results, title, owner);
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

router.delete('/:datasetId', async (req, res) => {
  let datasetId = req.params.datasetId;
  try {
    let dbRes = await deleteDataset(datasetId);
    res.status(201).send(dbRes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
