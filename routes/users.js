var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const userController = require('../controllers/user-controller');



module.exports = router;
