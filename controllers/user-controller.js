const userService = require('../services/user-service');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');
const jwt = require('../modules/jwt');
const bcrypt = require('bcrypt')

module.exports = {
    signup: async (req, res) => {
        const { email, pwd, name, largeAddress, smallAddress, univ, major, grade } = req.body;
        console.log(req.body);
        if(!email || !pwd || !name || !largeAddress || !smallAddress || !univ || !major || !grade) {
            return res.status(sc.BAD_REQUEST).send(rb.success(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            const { id } = await userService.signup(email, pwd, name, largeAddress, smallAddress, univ, major, grade);
            return res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.SINGUP_SUCCESS, { id }));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SINGUP_FAIL));
        }
    },
    signin: async (req, res) => {
        const { email, pwd } = req.body;
        if(!email || !pwd) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try{
            const user = await userService.signin(email);

            if(!user) {
                return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NO_ACCOUNT));
            }
            if (bcrypt.compareSync(pwd, user.pwd)== false){
                return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.MISMATCH_PWD));
            }
            const { accessToken } = await jwt.sign(user);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.SIGNIN_SUCCESS, { id: user.id, accessToken: accessToken }));
        } catch (e) {
            console.error(e);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGNIN_FAIL));
        }
    },
    readProfile: async (req, res) => {
        try {
            const result = await userService.readProfile(req.decoded);
            if(!result) { // 탈퇴했을 경우
                return res.status(sc.NO_CONTENT).send();
            }
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.PROFILE_READ_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROFILE_READ_FAIL));
        }
    },
    uploadProfileImage: async (req, res) => {
        if(!req.file) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            console.log(req.file);
            const result = { img: req.file.location };
            return res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.PROJECT_IMAGE_UPLOAD_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROFILE_IMAGE_UPLOAD_FAIL));
        }
    },
    updateProfile: async (req, res) => {
        const { 
            img, largeAddress, smallAddress, univ, major, grade,
            morning, night, dawn, plan, cramming, leader, follower, challenge, realistic
        } = req.body;
        if(img === undefined || !largeAddress || !smallAddress || !univ || !major || !grade ||
            morning === undefined || night === undefined || dawn === undefined || 
            plan === undefined || cramming === undefined || leader === undefined || 
            follower === undefined || challenge === undefined || realistic === undefined) {
            console.log(req.body);
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            console.log(req.body);
            await userService.updateProfile(req.decoded, req.body);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PROFILE_UPDATE_SUCCESS));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROFILE_UPDATE_FAIL));
        }
    },
    readMypage: async (req, res) => {
        try {
            let result = await userService.readMypage(req.decoded);
            const { Users, ProjectApplicants, Projects, Members } = result;
            result = {
                status: sc.OK,
                success: true,
                message: rm.MYPAGE_READ_SUCCESS,
                Users,
                ProjectApplicants,
                Projects,
                Members
            }
            return res.status(sc.OK).send(result);
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MYPAGE_READ_FAIL));
        }
    },
    findEmail: async (req, res) => {
        try {
            const result = await userService.findEmail(req.params.email);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.EMAIL_FIND_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.EMAIL_FIND_FAIL));
        }
    },
    readMyMember: async (req, res) => {
        try {
            const result = await userService.readMyMember(req.decoded);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.MY_MEMBER_READ_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MY_MEMBER_READ_FAIL));
        }
    },
    readMyProject: async (req, res) => {
        try {
            const result = await userService.readMyProject(req.decoded);
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.MY_PROJECT_READ_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MY_PROJECT_READ_FAIL));   
        }
    }
}