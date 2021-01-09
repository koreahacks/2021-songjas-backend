var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const memberController = require('../controllers/member-controller');

// [POST] 팀글 생성
router.post('/', checkToken, memberController.createMember);

module.exports = router;