'use strict';

var express = require('express');
var router = express.Router();

router.get('/getCheapestFor/:countPeople', function (req, res, next) {
  const countPeople = parseInt(req?.params?.countPeople);
  res.json({ success: true, countPeople: countPeople })
});

module.exports = router;
