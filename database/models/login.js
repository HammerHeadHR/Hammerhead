const { client } = require('../index.js');

const login = async (username) => {
  args = [username];
  sql = `
    SELECT u.*, t.name AS team
    FROM users u
    LEFT JOIN teams t ON t.id = u.team_id
    WHERE username = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

module.exports = {
  login,
};