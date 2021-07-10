const express = require('express');
const app = express();
const port = 3000;
const client = require('../database')
const models = require('../database/models.js')

app.use(express.static('client/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/dataset', async (req, res) => {

  var body = Object.keys(req.body)[0];
  var arr = body.split('\r\n');
  var keys = arr[0].split(';');
  var data = [];
  for (var i = 1; i < arr.length; i++) {
    var line = arr[i].split(';');
    var obj = {};
    for (var j = 0; j < line.length; j++) {
      if (line[j]) {
        obj[keys[j]] = line[j];
      }
    }
    if (obj[keys[0]] !== undefined) {
      data.push(obj);
    }
  }

  // console.log(data)

  await models.addDataset(data, 'bitcoin');

  res.end();

});

app.get('/dataset', async (req, res) => {

  let dataName = req.query.name;

  let dbRes = await models.getDataset(dataName);

  res.json(dbRes.rows[0].data);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});