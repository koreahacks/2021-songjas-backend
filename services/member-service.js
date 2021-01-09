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
    readMember: async (UserId, title, type, field, position, largeAddress, smallAddress, limitUniv,
                         morning, night, dawn, plan, cramming, leader, follower, challenge, realistic) => {
        try {
            let whereOption = {};
            let andOption = [];
            let orOption1 = [];
            let orOption2 = [];
            let orOption3 = [];
            let orOption4 = [];
            let includeWhereOption1 = {};
            let includeAndOption1 = [];
            let includeWhereOption2 = {};
            let includeAndOption2 = [];
            

            if(!title){
                if(!type && !field && !position && !largeAddress && !smallAddress && !limitUniv &&
                    !morning && !night && !dawn && !plan && !cramming && !leader && !follower && !challenge && !realistic){
                    console.log('타이틀 없음 && 쿼리 없음');
                    includeWhereOption1 = {
                        open: true,
                    }
                 }else{
                    console.log('타이틀 없음 && 쿼리 있음')
                     // true(전체), false(자대)
                    const user = await User.findByPk(UserId);
                    let { univ } = user;
                    if(limitUniv) { 
                        if(!JSON.parse(limitUniv)){ //false이면
                            console.log(univ)
                        } else { 
                            univ = null;
                        }
                    }else{
                        univ = null;
                    }

                    // Or 옵션 추가
                    morning ? orOption1.push({ morning: JSON.parse(morning) }) : null;
                    night ? orOption1.push({ night: JSON.parse(night) }) : null;
                    dawn ? orOption1.push({ dawn: JSON.parse(dawn) }) : null;
                    plan ? orOption2.push({ plan: JSON.parse(plan) }) : null;
                    cramming ? orOption2.push({ cramming: JSON.parse(cramming) }) : null; 
                    leader ? orOption3.push({ leader: JSON.parse(leader) }) : null;
                    follower ? orOption3.push({ follower: JSON.parse(follower) }) : null; 
                    challenge ? orOption4.push({ challenge: JSON.parse(challenge) }) : null; 
                    realistic ? orOption4.push({ realistic: JSON.parse(realistic) }) : null;

                    // And 옵션 추가
                    largeAddress ? andOption.push({ largeAddress}) : null;
                    smallAddress ? andOption.push({ smallAddress }) : null;
                    univ ? andOption.push({ univ }) : null;
                    orOption1.length > 0 ? andOption.push({ [Op.or]: orOption1 }) : null;
                    orOption2.length > 0 ? andOption.push({ [Op.or]: orOption2}) : null;
                    orOption3.length > 0 ? andOption.push({ [Op.or]: orOption3}) : null;
                    orOption4.length > 0 ? andOption.push({ [Op.or]: orOption4}) : null;
                    
                    whereOption = {
                        [Op.and]: andOption
                    }

                    type ? includeAndOption1.push({ type }) : null;
                    field ? includeAndOption1.push({ field }) : null;
                    includeWhereOption1 = {
                        open: true,
                        [Op.and]: includeAndOption1,
                    }

                    position ? includeAndOption2.push({ position }) : null;
                    includeWhereOption2 = {
                        [Op.and]: includeAndOption2
                    }

                 }
            }
            else {
                if(!type && !field && !position && !largeAddress && !smallAddress && !limitUniv &&
                    !morning && !night && !dawn && !plan && !cramming && !leader && !follower && !challenge && !realistic) {
                    console.log('타이틀 있음 && 쿼리 없음'); // 타이틀 있음 && 쿼리 없음 => 검색 적용 (공개된 목록만!)
                    includeWhereOption1 = {
                        open: true,
                        title: {
                            [Op.substring]: `${title}`
                        }
                    }
                } else {
                    console.log('타이틀 있음 && 쿼리 있음')
                     // true(전체), false(자대)
                     const user = await User.findByPk(UserId);
                     let { univ } = user;
                     if(limitUniv) { 
                         if(!JSON.parse(limitUniv)){ //false이면
                             console.log(univ)
                         } else { 
                             univ = null;
                         }
                     }else{
                         univ = null;
                     }

                    // Or 옵션 추가
                    morning ? orOption1.push({ morning: JSON.parse(morning) }) : null;
                    night ? orOption1.push({ night: JSON.parse(night) }) : null;
                    dawn ? orOption1.push({ dawn: JSON.parse(dawn) }) : null;
                    plan ? orOption2.push({ plan: JSON.parse(plan) }) : null;
                    cramming ? orOption2.push({ cramming: JSON.parse(cramming) }) : null; 
                    leader ? orOption3.push({ leader: JSON.parse(leader) }) : null;
                    follower ? orOption3.push({ follower: JSON.parse(follower) }) : null; 
                    challenge ? orOption4.push({ challenge: JSON.parse(challenge) }) : null; 
                    realistic ? orOption4.push({ realistic: JSON.parse(realistic) }) : null;

                    // And 옵션 추가
                    largeAddress ? andOption.push({ largeAddress}) : null;
                    smallAddress ? andOption.push({ smallAddress }) : null;
                    univ ? andOption.push({ univ }) : null;
                    orOption1.length > 0 ? andOption.push({ [Op.or]: orOption1 }) : null;
                    orOption2.length > 0 ? andOption.push({ [Op.or]: orOption2}) : null;
                    orOption3.length > 0 ? andOption.push({ [Op.or]: orOption3}) : null;
                    orOption4.length > 0 ? andOption.push({ [Op.or]: orOption4}) : null;
                    
                    whereOption = {
                        [Op.and]: andOption
                    }

                    type ? includeAndOption1.push({ type }) : null;
                    field ? includeAndOption1.push({ field }) : null;
                    includeWhereOption1 = {
                        title: {
                            [Op.substring]: `${title}`
                        },
                        open: true,
                        [Op.and]: includeAndOption1
                    }

                    position ? includeAndOption2.push({ position }) : null;
                    includeWhereOption2 = {
                        [Op.and]: includeAndOption2
                    }
                }
            }

            const result = await User.findAll({
                attributes: ['id','img','largeAddress', 'smallAddress'],
                where: whereOption,
                include: [{
                    model: Member,
                    attributes: ['id','title', 'type', 'field'],
                    where: includeWhereOption1,
                    include: [
                        {
                            model: MemberPosition,
                            attributes: ['position'],
                            where: includeWhereOption2
                        },
                    ]
                }],
                order: [[{ model: Member }, "createdAt", "DESC"]]
            });
            return result;
            
        } catch (error) {
            console.error(error);
            throw error;
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