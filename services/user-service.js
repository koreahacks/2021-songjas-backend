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
    readProfile: async (id) => { 
        try {
            const result = await User.findOne({
                where: {
                    id
                },
                attributes: { exclude: ['id', 'pwd'] } 
            });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateProfile: async (id, user) => {
        try {
            const result = await User.update(user,
            {
                where: {
                    id
                }
            });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    findEmail: async (email) => {
        try {
            const result = User.findOne({
                where: {
                    email
                },
                attributes: ['id', 'email', 'name', 'img']
            });
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
}
