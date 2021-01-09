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
}