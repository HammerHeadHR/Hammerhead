const { client } = require('../index.js');

const addNotification = async (senderId, receiverId, datasetId) => {
  const args = [senderId, receiverId, datasetId];
  const sql = `
    INSERT INTO notifications
      (sender_id, receiver_id, dataset_id)
    VALUES
      ($1, $2, $3)
    RETURNING id;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const getNotifications = async (receiverId) => {
  const args = [receiverId];
  const sql = `
    SELECT * FROM notifications
    WHERE receiver_id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes.rows;
};

const updateNotification = async (notificationId) => {
  const args = [notificationId];
  const sql = `
    UPDATE notifications
    SET
      viewed = true
    WHERE id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

const updateAllNotifications = async (userId) => {
  const args = [userId];
  const sql = `
    UPDATE notifications
    SET
      viewed = true
    WHERE receiver_id = $1;
  `;

  let dbRes = await client.query(sql, args);
  return dbRes;
};

module.exports = {
  addNotification,
  getNotifications,
  updateNotification,
  updateAllNotifications
};