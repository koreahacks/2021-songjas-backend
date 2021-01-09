const userService = require('../services/user-service');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');
const jwt = require('../modules/jwt');

module.exports = {
    signup: async (req, res) => {
        try {
           console.log('회원가입 컨트롤러'); 
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}