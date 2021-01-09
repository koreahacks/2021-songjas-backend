var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const memberController = require('../controllers/member-controller');

// [POST] 팀글 생성
router.post('/', checkToken, memberController.createMember);

//[GET] 팀글 내용 조회
router.get('/:id', checkToken, memberController.readMemberContent);

// [GET] 팀글 목록 조회
router.get('/', checkToken, memberController.readMember);

module.exports = router;