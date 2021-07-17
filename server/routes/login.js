const express = require('express');
const router = express.Router();
const { createHash, compareHash } = require('../hashUtil.js');
const { login } = require('../../database/models/login.js');

router.post('/', async (req, res, next) => {
  let { username, password } = req.body;

  try {
    let dbRes = await login(username);
    if (dbRes.rowCount === 1) {
      let row = dbRes.rows[0];
      let stored = row.password;
      let salt = row.salt;

      if (compareHash(password, stored, salt)) {
        let data = {
          'id': row.id,
          'username': row.username,
          'team': row.team,
          'admin': row.admin
        };
        // res.status(201).send(data);
        res.locals.user = data;
        next();
      } else {
        res.status(400).send('Password Invalid');
      }
    } else {
      res.status(500).send('User does not exist.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
