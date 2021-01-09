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
}