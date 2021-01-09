var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const authController = require('../controllers/auth-controller');

// [POST] 이메일 인증 
router.post('/email', authController.email);

module.exports = router;