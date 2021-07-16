const express = require('express');
const router = express.Router();
const { getUser } = require('../../database/models/users.js');

router.get('/', async (req, res) => {
  try {
    const user_id = req.body.user_id
    let dbRes = await getUser(user_id);
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
