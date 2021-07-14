const { client } = require('../index.js');

const addNote = async (datasetId, ownerId, body) => {
  const args = [datasetId, ownerId, body];
  const sql = `
    INSERT INTO notes
      (dataset_id, owner_id, body)
    VALUES
      ($1, $2, $3)
    RETURNING id;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const deleteNote = async (noteId) => {
  const args = [noteId];
  const sql = `
    DELETE FROM notes
    WHERE id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getNotes = async (datasetId) => {
  const args = [datasetId];
  const sql = `
    SELECT
      n.id, u.username AS owner, n.body, n.created_at
    FROM notes n
    LEFT JOIN users u ON u.id = n.owner_id
    WHERE dataset_id = $1
    ORDER BY n.created_at DESC;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes.rows;
};

module.exports = {
  addNote,
  deleteNote,
  getNotes
};