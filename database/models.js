const { client } = require('./index.js')

const addDataset = async (data, name) => {

  data = JSON.stringify(data);

  const args = [name, data];
  const sql  = `INSERT INTO datasets (name, data) VALUES ($1, $2);`;

  let dbRes = await client.query(sql, args);
  console.log(dbRes);
}

const getDataset = async (name) => {
  const args = [name];
  const sql = `SELECT * FROM datasets WHERE name = $1`

  let dbRes = await client.query(sql, args);
  return dbRes;
}

module.exports = {
  addDataset,
  getDataset
}