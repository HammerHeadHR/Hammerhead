const express = require('express');
const router = express.Router();
const { createHash, createRandom32String } = require('../hashUtil.js');
const { addUser, updateUser, updatePassword, deleteUser, getUsers } = require('../../database/models/users.js');

router.post('/create', async (req, res) => {
  let { username, password, team, admin } = req.body;

  let salt = createRandom32String();
  let hashed = createHash(password, salt);

  try {
    let dbRes = await addUser(username, team, hashed, salt, admin);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Add user failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/update', async (req, res) => {
  let { userId, username, team, password, admin } = req.body;

  let salt = password ? createRandom32String() : null;
  let hashed = password ? createHash(password, salt) : null;

  try {
    let dbRes = await updateUser(userId, username, team, hashed, salt, admin);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Update user failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/password', async (req, res) => {
  let { userId, password } = req.body;

  let salt = createRandom32String();
  let hashed = createHash(password, salt);

  try {
    let dbRes = await updatePassword(userId, hashed, salt);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Update password failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/remove', async (req, res) => {
  let { userId } = req.body;
  try {
    let dbRes = await deleteUser(userId);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Remove user failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    let dbRes = await getUsers();
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;