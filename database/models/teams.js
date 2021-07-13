const { client } = require('../index.js');

const addTeam = async (name) => {

  const args = [name];
  const sql = `
    INSERT INTO teams (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING id;
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

const updateTeam = async (teamId, name) => {
  let args = [teamId, name];
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