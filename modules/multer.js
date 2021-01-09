const path = require("path");
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { ENDPOINT, REGION, ACCESS_KEY, SECRET_KEY } = require('../config/naver-cloud');

// 네이버 클라우드 연결
const s3 = new aws.S3({
    endpoint: ENDPOINT,
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    }
});

// 버킷에 이미지 업로드
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'test-server',
        acl: 'public-read',
        key: function(req, file, cb) {
            //파일 이름에 현재 시각 추가
            cb(null, `timmo/${Date.now()}${path.basename(file.originalname)}`)
        }
    })
});
module.exports = upload;