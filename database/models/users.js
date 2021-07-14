const { client } = require('../index.js');

const addUser = async (username, team, password, salt, admin) => {

  const args = [username, team, password, salt, admin];
  const sql = `
    INSERT INTO USERS
      (username, team_id, password, salt, admin)
    VALUES
      ($1, (SELECT id FROM teams WHERE name = $2), $3, $4, $5)
    ON CONFLICT (username) DO NOTHING
    RETURNING id;
    `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updateUsername = async (userId, username) => {

  const args = [userId, username];
  const sql = `
  UPDATE users
  SET
    username = $2
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updatePassword = async (userId, password, salt) => {

  const args = [userId, password, salt];
  const sql = `
  UPDATE users
  SET
    password = $2,
    salt = $3
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updateTeam = async (userId, teamId) => {

  const args = [userId, teamId];
  const sql = `
  UPDATE users
  SET
    team_id = $2
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updateAdmin = async (userId, admin) => {

  const args = [userId, admin];
  const sql = `
  UPDATE users
  SET
    admin = $2
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const deleteUser = async (userId) => {

  const args = [userId];
  const sql = `
  UPDATE users
  SET
    active = NOT active
  WHERE users.id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getUsers = async () => {
  const sql = `
  SELECT * FROM users;
  `;

  let dbRes = await client.query(sql);
  return dbRes.rows;
};

module.exports = {
  addUser,
  updateUsername,
  updatePassword,
  updateTeam,
  updateAdmin,
  deleteUser,
  getUsers
};