'use strict';

var express = require('express');
var router = express.Router();
const DbService = require('../services/dbService');

router.get('/getCheapestFor/:countPeople', function (req, res, next) {
  const countPeople = parseInt(req?.params?.countPeople);
  try {
    DbService.execute(async function (listingsAndReviews) {
      let houses = await listingsAndReviews.count({ property_type: "House" });
      res.json({ count: houses });
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
