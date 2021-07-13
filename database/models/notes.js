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
    SELECT * FROM notes
    WHERE dataset_id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes.rows;
};

module.exports = {
  addNote,
  deleteNote,
  getNotes
}