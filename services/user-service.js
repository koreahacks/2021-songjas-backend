const { User, Member, Project, MemberPosition, ProjectPosition, ProjectApplicant} = require('../models');

module.exports = {
    signup: async (email, pwd, name, largeAddress, smallAddress, univ, major, grade) => {
        try {
            const result = await User.create({
                email, 
                pwd,
                name,
                largeAddress,
                smallAddress,
                univ,
                major,
                grade
            }); 
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    signin: async (email) => {
        try{
            const result = await User.findOne({
                where: {
                    email: email
                }
            });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
}
