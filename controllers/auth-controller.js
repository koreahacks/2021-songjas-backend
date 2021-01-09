const ejs = require('ejs'); 
const path = require('path');
const nodemailer = require('nodemailer');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');
const { NODEMAILER_USER, NODEMAILER_PWD } = require('../config/from-email.js');

module.exports = {
    email: async (req, res) => {
        const { email } = req.body;
        let authNum = Math.random().toString().substr(2,6);
        let emailTemplete;
        // 상대 경로 설정
        ejs.renderFile(path.join(__dirname,'../template/authMail.ejs'), {authCode : authNum}, function (err, data) {
            if(err){console.log(err)}
            emailTemplete = data;
        });


        if(!email) {
            return res.status(sc.BAD_REQUEST).send(rb.success(sc.BAD_REQUEST, rm.NULL_VALUE));
        }

        //전송 기능 객체
        let transporter = nodemailer.createTransport({
            // 사용하고자 하는 서비스
            service: 'gmail',
            // host를 gmail로 설정
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PWD
            }
        });
        
        let mailOptions = await transporter.sendMail({
            //보내는 곳의 이름과 메일 주소 입력
            from: `"TIMMO" <${NODEMAILER_USER}>`,
            //받는 메일 주소
            to: email,
            subject: 'TIMMO 회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete
        });
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EMAIL_FAIL));
            }
            console.log("Finish sending email : " + info.response);
            res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.EMAIL_SUCCESS, { authNum : authNum })); 
            transporter.close()
        });
    },
    autoSignIn: async (req, res) => {
        return res.status(sc.OK).send(rb.successData(sc.OK, rm.SIGNIN_SUCCESS, { id : req.decoded }));
    }
}
