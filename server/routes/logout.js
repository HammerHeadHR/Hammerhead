const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('_hh4DcT')
  res.redirect('/');
});

module.exports = router