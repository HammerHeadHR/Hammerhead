const express = require('express');
const router = express.Router();
const { addNotification, updateNotification, getNotifications } = require('../../database/models/notifications.js');

router.post('/', async (req, res) => {
  let { senderId, receiverId, datasetId } = req.body;
  try {
    let dbRes = await addNotification(senderId, receiverId, datasetId);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Added notification');
    } else {
      res.status(500).send('Add notification failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:receiverId', async (req, res) => {
  let { receiverId } = req.params;
  try {
    let dbRes = await getNotifications(receiverId);
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  let { notificationId } = req.body;
  try {
    let dbRes = await updateNotification(notificationId);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Updated notification');
    } else {
      res.status(500).send('Update notification failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
