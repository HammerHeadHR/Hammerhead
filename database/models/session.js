const { client } = require('../index.js');

const setSession = async (username, hash) => {

  args = [username, hash]
  sql = `
    INSERT INTO sessions (hash, user_id)
    VALUES ($2, (SELECT id from users WHERE username = $1))
    ON CONFLICT (user_id) DO UPDATE SET hash = $2
    RETURNING id
  `
  let dbRes = await client.query(sql, args);
  return dbRes;
}

const getSession = async (sessionHash) => {
  args = [sessionHash];
  sql = `
  SELECT
      user_id, hash, s.id, username
    FROM sessions s
    LEFT JOIN users u ON u.id = s.user_id
    WHERE hash = $1
`;

let dbRes = await client.query(sql, args);
return dbRes.rows[0];
}

const deleteSession = async (sessionHash) => {
  try {
    ars = [sessionHash];
    sql = `
    DELETE FROM sessions
    WHERE hash = $1
    RETURNING user_id
    `;
    const dbRes = await client.query(sql, args);
    return dbRes.rows[0];
  } catch (err) {
    console.error(err);
  }
}

module.exports = { setSession, getSession, deleteSession}