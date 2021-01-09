const { User, Member, MemberPosition, MemberActivity } = require('../models');
const { Op } = require("sequelize");

module.exports = {
    createMember: async (member) => {
        try {
            // 연관 테이블과 함께 생성
            await Member.create(member, {
                include: [
                    {
                        model: MemberActivity
                    },
                    {
                        model: MemberPosition
                    }
                ]
            });
        } catch (error) {
            console.error(error);
            throw e;
        }
    },
    readMemberContent: async (paramsId, memUserId) => {
        try {
            const member = await Member.findByPk(paramsId);
            const { id, createdAt, title, type, field, content, link, UserId } = member;
            
            const Users = await User.findOne({
                where: {
                    id: UserId
                },
                attributes: {
                    exclude: ['pwd']
                }
            })
            
            const memberPosition = await MemberPosition.findAll({
                where:{
                    MemberId: paramsId,
                },
                    attributes: ['position']
            })
            const memberActivity = await MemberActivity.findAll({
                where:{
                    MemberId: paramsId
                },
                attributes: ['content', 'date'],
            })
            const result = {
                Users,
                Members: {
                    id, 
                    createdAt, 
                    title, 
                    type, 
                    field, 
                    content, 
                    link, 
                    UserId
                },
                MemberPositions: memberPosition,
                MemberActivities: memberActivity
            }
            return result;
        } catch(error) {
            console.error(error);
            throw error;
        }
    },
}