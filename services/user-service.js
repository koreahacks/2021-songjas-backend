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
    readMypage: async (id) => {
        try {
            const whereOption = { UserId: id };
            const orderOption = [
                ['createdAt', 'DESC'] //최신순 정렬
            ];
            const attributesOption = [
                'id', 'limitUniv', 'largeAddress', 'smallAddress', 'startDate', 'endDate', 'title', 'type', 'field'
            ];
            
            const user = await User.findByPk(id);
            const { img, name, largeAddress, smallAddress } = user;

            const projectApplicant = await Project.findAll({
                include: [
                    {
                        model: ProjectPosition,
                        attributes: ['position', 'headCount']
                    },
                    {
                        model: ProjectApplicant,
                        attributes: [ ],
                        where: whereOption
                    }
                ],
                attributes: attributesOption,
                order: orderOption
            });
            const project = await Project.findAll({
                include: [
                    {
                        model: ProjectPosition,
                        attributes: ['position', 'headCount']
                    }
                ],
                where: whereOption,
                attributes: attributesOption,
                order: orderOption
            });
            const member = await Member.findAll({
                include: [
                    { 
                        model: MemberPosition,
                        attributes: ['position']
                    }
                ],
                where: whereOption,
                attributes: ['id', 'title', 'type', 'field'],
                order: orderOption
            })

            // 응답 결과
            const result = {
                Users: {
                    img,
                    name, 
                    largeAddress, 
                    smallAddress,
                    projectApplicantCount: projectApplicant.length,
                    projectCount: project.length,
                    memberCount: member.length
                },
                ProjectApplicants: projectApplicant,
                Projects: project,
                Members: member
            }
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
    readMyMember: async (id) => {
        try {
            const result = await Member.findAll({
                where: {
                    UserId: id
                },
                attributes: ['id', 'title', 'UserId']
            })
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    readMyProject: async (id) => {
        try {
            const result = await Project.findAll({
                where: {
                    UserId: id
                },
                attributes: ['id', 'title', 'room', 'UserId']
            })
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
