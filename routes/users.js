var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const userController = require('../controllers/user-controller');

// [POST] 회원가입 
router.post('/signup', userController.signup);

module.exports = router;
