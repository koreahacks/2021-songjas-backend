var express = require('express');
var router = express.Router();
const upload = require('../modules/multer');
const { checkToken } = require('../middleware/auth');
const projectController = require('../controllers/project-controller');

// [POST] 팀모 지원하기
router.post('/applicants', checkToken, projectController.applyProject);
// [POST] 현재 팀원 팀글(이력서) 등록
router.patch('/members', checkToken, projectController.memberProject);

// [POST] 팀모 이미지 등록
router.post('/images', checkToken, upload.single('img'), projectController.uploadProjectImage);
// [POST] 팀모(모집글) 등록
router.post('/', checkToken, projectController.createProject);

module.exports = router;