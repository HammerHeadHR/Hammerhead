const express = require('express');
const router = express.Router();
const { addTeam, getTeams, updateTeam } = require('../../database/models/teams.js');
const { verifyAdmin } = require('../middleware/session')

router.post('/', verifyAdmin, async (req, res) => {
  let { name } = req.body;
  try {
    let dbRes = await addTeam(name);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
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

router.put('/', verifyAdmin, async (req, res) => {
  let { teamId, name } = req.body;
  try {
    let dbRes = await updateTeam(teamId, name);
    if (dbRes.rowCount === 1) {
      res.status(201).send(dbRes.rows[0]);
    } else {
      res.status(400).send('Update Team failed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
