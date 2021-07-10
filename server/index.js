const express = require('express');
const app = express();
const port = 3000;
const client = require('../database');
const models = require('../database/models.js');
const csv = require('csv-parser')
const fs = require('fs')
const formidable = require('express-formidable');
const { parseData } = require('./parseData.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/dataset', formidable());

app.post('/dataset', (req, res) => {

  const results = [];
  let key = Object.keys(req.files)[0];
  let path = req.files[key].path;
  let dataName = req.fields.name;

  fs.createReadStream(path)
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    let dbRes = await models.addDataset(results, dataName);
    res.send(dbRes);
  });

});

app.get('/dataset/', async (req, res) => {
  let dataName = req.query.name;
  let dbRes = await models.getDataset(dataName);
  res.json(dbRes.rows[0].data);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});