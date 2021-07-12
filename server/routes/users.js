const express = require('express');
const router = express.Router();
const { addUser, updateUser, updatePassword, deleteUser, getUsers } = require('../../database/models/users.js');

router.post('/create', async (req, res) => {
  let { username, password, team, admin } = req.body;
  try {
    let dbRes = await addUser(username, team, password, admin);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Added user');
    } else {
      res.status(500).send('Add user failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/update', async (req, res) => {
  let { id, username, team, password, admin } = req.body;
  try {
    let dbRes = await updateUser(id, username, team, password, admin);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Updated user');
    } else {
      res.status(500).send('Update user failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/password', async (req, res) => {
  let { id, password } = req.body;
  try {
    let dbRes = await updatePassword(id, password);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Updated password');
    } else {
      res.status(500).send('Update password failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/remove', async (req, res) => {
  let { id } = req.body;
  try {
    let dbRes = await deleteUser(id);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Removed user');
    } else {
      res.status(500).send('Remove user failed');
    }
  } catch (error) {
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