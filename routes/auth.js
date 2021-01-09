var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const authController = require('../controllers/auth-controller');



module.exports = router;