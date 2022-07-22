'use strict';

var express = require('express');
var router = express.Router();
const ChallengeController = require('../controllers/challenge')

router.get('/getCheapestFor/:countPeople', async function (req, res, next) {
  const countPeople = parseInt(req?.params?.countPeople);
  try {
    let challenge = new ChallengeController();
    const result = await challenge.process(countPeople);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
