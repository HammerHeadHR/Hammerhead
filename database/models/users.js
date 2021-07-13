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

const updateUser = async (userId = null, username = null, team = null, password = null, salt = null, admin = null) => {

  const args = [userId, username, team, password, salt, admin];
  console.log(args);
  const sql = `
  UPDATE users
  SET
    username = COALESCE($2, username),
    team_id = COALESCE(teams.id, team_id),
    password = COALESCE($4, password),
    salt = COALESCE($5, salt),
    admin = COALESCE($6, salt)
  FROM (SELECT t.id FROM teams t WHERE name = $3) AS teams
  WHERE users.id = $1
  AND (
    $1 IS NOT NULL AND $1 IS DISTINCT FROM username OR
    $2 IS NOT NULL AND $2 IS DISTINCT FROM team_id OR
    $3 IS NOT NULL AND $3 IS DISTINCT FROM password OR
    $4 IS NOT NULL AND $4 IS DISTINCT FROM salt OR
    $5 IS NOT NULL AND $5 IS DISTINCT FROM admin
  );
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
  updateUser,
  updatePassword,
  deleteUser,
  getUsers
};