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
  SELECT users.active, users.admin, users.id, users.username, users.team_id, teams.name
  FROM users
  LEFT JOIN teams
  ON users.team_id = teams.id;
  `;

  let dbRes = await client.query(sql);
  return dbRes.rows;
};

const getUser = async (userId) => {
  const args = [userId]
  const sql = `
    SELECT u.id, username, t.name AS team, admin, active
    FROM users u
    LEFT JOIN teams t ON u.team_id = t.id
    WHERE u.id = $1
  `;
  const dbRes = await client.query(sql, args);
  return dbRes.rows[0];
}

module.exports = {
  addUser,
  updateUsername,
  updatePassword,
  updateTeam,
  updateAdmin,
  deleteUser,
  getUsers,
  getUser
};