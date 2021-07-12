const { client } = require('../index.js');

const addTeam = async (name) => {

  const args = [name];
  const sql = `
    INSERT INTO teams (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getTeams = async () => {
  const sql = `
    SELECT * FROM teams;
  `;

  let dbRes = await client.query(sql);
  return dbRes.rows;
};

const updateTeam = async (id, name) => {
  let args = [id, name];
  let sql = `
    UPDATE teams
    SET
      name = $2
    WHERE id = $1
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

module.exports = {
  addTeam,
  getTeams,
  updateTeam
};