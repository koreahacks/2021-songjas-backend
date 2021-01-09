var express = require('express');
var router = express.Router();
const upload = require('../modules/multer');
const { checkToken } = require('../middleware/auth');
const userController = require('../controllers/user-controller');

// [POST] 회원가입 
router.post('/signup', userController.signup);
// [POST] 로그인 
router.post('/signin', userController.signin);

// [GET] 팀글 선택 목록 조회 (내 팀글)
router.get('/members', checkToken, userController.readMyMember);
// [GET] 팀모 선택 목록 조회 (내 팀모)
router.get('/projects', checkToken, userController.readMyProject);
// [GET] 마이페이지 조회 
router.get('/mypage', checkToken, userController.readMypage);

// [GET] 사용자(팀원) 검색
router.get('/:email', checkToken, userController.findEmail);

// [GET] 프로필 조회
router.get('/', checkToken, userController.readProfile);
// [POST] 프로필 이미지 등록
router.post('/images', checkToken, upload.single('img'), userController.uploadProfileImage);
// [PATCH] 프로필 수정
router.patch('/', checkToken, userController.updateProfile);

module.exports = router;
