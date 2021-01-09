var express = require('express');
var router = express.Router();
const upload = require('../modules/multer');
const { checkToken } = require('../middleware/auth');
const userController = require('../controllers/user-controller');

// [POST] 회원가입 
router.post('/signup', userController.signup);
// [POST] 로그인 
router.post('/signin', userController.signin);

// [GET] 프로필 조회
router.get('/', checkToken, userController.readProfile);
// [POST] 프로필 이미지 등록
router.post('/images', upload.single('img'), checkToken, userController.uploadProfileImage);
// [PATCH] 프로필 수정
router.patch('/', checkToken, userController.updateProfile);

module.exports = router;
