const { client } = require('../index.js');

const addDataset = async (data, title, owner, team) => {

  data = JSON.stringify(data);

  const args = [title, data, owner, team];
  const sql = `
    INSERT INTO datasets
      (title, datapoints, owner_id, team_id)
    VALUES
      ($1, $2, $3, $4)
    ON CONFLICT (title) DO NOTHING;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getDataset = async (id) => {
  const args = [id];
  const sql = `
  SELECT
    d.title, d.datapoints, u.username AS owner, t.name AS team
  FROM datasets d
  LEFT JOIN users u ON u.id = d.owner_id
  LEFT JOIN teams t ON t.id = d.team_id
  WHERE d.id = $1
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getAllDatasets = async () => {
  const sql = `
    SELECT
      id, title, owner_id, team_id, created_at
    FROM datasets;
  `;

  let dbRes = await client.query(sql);
  return dbRes;
};

const updateDataset = async (id, data, title, owner) => {
  data = JSON.stringify(data);

  const args = [id, title, data, owner];
  const sql = `
    UPDATE datasets
    SET
      title = $2,
      datapoints = $3,
      owner_id = test.id
    FROM (SELECT u.id FROM users u WHERE username = $4) AS test
    WHERE datasets.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const deleteDataset = async (id) => {
  const args = [id];
  const sql = `
    DELETE FROM datasets
    WHERE id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

module.exports = {
  addDataset,
  getDataset,
  updateDataset,
  deleteDataset,
  getAllDatasets
};