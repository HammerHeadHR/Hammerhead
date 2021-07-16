const express = require('express');
const router = express.Router();
const { createHash, createRandom32String } = require('../hashUtil.js');
const { addUser, updateUsername, updateTeam, updateAdmin, updatePassword, deleteUser, getUsers, getUser} = require('../../database/models/users.js');

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

router.put('/username', async (req, res) => {
  let { userId, username } = req.body;

  try {
    let dbRes = await updateUsername(userId, username);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Update username failed');
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

router.put('/team', async (req, res) => {
  let { userId, teamId } = req.body;

  try {
    let dbRes = await updateTeam(userId, teamId);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Update team failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/admin', async (req, res) => {
  let { userId, admin } = req.body;

  try {
    let dbRes = await updateAdmin(userId, admin);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(500).send('Update admin failed');
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

router.get('/current', async (req, res) => {
  try {
    const user_id = req.body.user_id
    let dbRes = await getUser(user_id);
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
})
module.exports = router;