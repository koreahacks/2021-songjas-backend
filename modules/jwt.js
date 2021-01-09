const jwt = require('jsonwebtoken');
const { SECRET_KEY, options } = require('../config/secret-key');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        const payload = {
            id: user.id,
            name: user.name
        };
        const token = {
            accessToken: jwt.sign(payload, SECRET_KEY, options)
        };
        console.log(token);
        return token;
    },
    verify: async (token) => {
        let decode;
        try{
            decode = jwt.verify(token, SECRET_KEY);
            return decode;
        } catch(e) {
            if(e.message === 'jwt expired'){
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if(e.message === 'invalid token') {
                console.log('invalid token');
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
    }
}