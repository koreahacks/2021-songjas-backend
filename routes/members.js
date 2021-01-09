var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const memberController = require('../controllers/member-controller');



module.exports = router;