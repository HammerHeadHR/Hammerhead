const express = require('express');
const router = express.Router();
const { addTeam, getTeams, updateTeam } = require('../../database/models/teams.js');

router.post('/', async (req, res) => {
  let { name } = req.body;
  try {
    let dbRes = await addTeam(name);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Added Team');
    } else {
      res.status(400).send('Add Team failed');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    let dbRes = await getTeams();
    res.send(dbRes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  let { id, name } = req.body;
  try {
    let dbRes = await updateTeam(id, name);
    if (dbRes.rowCount === 1) {
      res.status(201).send('Updated Team');
    } else {
      res.status(400).send('Update Team failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
