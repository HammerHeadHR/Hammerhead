const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.clearCookie('_hh4DcT');
  res.redirect('/');
});

module.exports = router