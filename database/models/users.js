const { client } = require('../index.js');

const addUser = async (username, team, password, admin) => {

  const args = [username, team, password, admin];
  const sql = `
    INSERT INTO USERS
      (username, team_id, password, admin)
    VALUES
      ($1, (SELECT id FROM teams WHERE name = $2), $3, $4);
    `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updateUser = async (id, username, team, password, admin) => {

  const args = [id, username, team, password, admin];
  const sql = `
  UPDATE users
  SET
    username = $2,
    team_id = teams.id,
    password = $4,
    admin = $5
  FROM (SELECT t.id FROM teams t WHERE name = $3) AS teams
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updatePassword = async (id, password) => {

  const args = [id, password];
  const sql = `
  UPDATE users
  SET
    password = $2
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const deleteUser = async (id) => {

  const args = [id];
  const sql = `
  UPDATE users
  SET
    active = false
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getUsers = async () => {
  const sql = `
  SELECT * FROM users ;
  `;

  let dbRes = await client.query(sql);
  return dbRes.rows;
};



module.exports = {
  addUser,
  updateUser,
  updatePassword,
  deleteUser,
  getUsers
};