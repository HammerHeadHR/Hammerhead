const { client } = require('../index.js');

const setSession = async (username, hash) => {
  args = [username, hash]
  sql = `
    INSERT INTO sessions (hash, user_id)
    VALUES ($2, (SELECT id from users WHERE username = $1))
    ON CONFLICT (hash) DO NOTHING
    RETURNING hash
  `
  let dbRes = await client.query(sql, args);
  return dbRes;
}

const getSession = async (sessionHash) => {
  args = [sessionHash];
  sql = `
  SELECT *
  FROM sessions
  WHERE hash = $1;
`;

let dbRes = await client.query(sql, args);
return dbRes.rows;
}


const getUserId = async (sessionHash) => {
  args = [sessionHash];
  sql = `
    SELECT user_id,
    FROM sessions
    WHERE hash = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

module.exports = { setSession, getSession, getUserId}