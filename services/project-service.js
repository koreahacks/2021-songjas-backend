const { Op } = require("sequelize");
const { Project, ProjectPosition, ProjectMember, ProjectApplicant, User } = require('../models');

module.exports = {
    createProject: async (project) => {
        // 전체, 자대 boolean에서 문자열로 변경
        const user = await User.findByPk(project.UserId);
        project.limitUniv = user.univ;
        // 연관 테이블과 함께 생성
        await Project.create(project, {
            include: [
                {
                    model: ProjectMember
                },
                {
                    model: ProjectPosition
                }
            ]
        });
    },
    readProjectContent: async (ProjectId, decoded) => {
        try { 
            const whereOption = { ProjectId };
            const includeOption = [
                {
                    model: User,
                    attributes: ['img', 'name'],
                }   
            ];

            const project = await Project.findByPk(ProjectId);
            const { UserId, id, limitUniv, startDate, endDate, createdAt, title, 
                largeAddress, smallAddress, type, field, content, link, 
                morning, night, dawn, plan, cramming, leader, follower, challenge, realistic
            } = project;
            const projectPosition = await ProjectPosition.findAll({
                where: whereOption
            })
            const projectMember = await ProjectMember.findAll({
                where: whereOption,
                include: includeOption,
                raw: true //하나로 합쳐서
            });
            const projectApplicant = await ProjectApplicant.findAll({
                where: whereOption,
                include: includeOption,
                raw: true //하나로 합쳐서
            });

            const whereCheckOption = {
                ProjectId,
                UserId: decoded
            };
            const projectMemberCheck = await ProjectMember.findOne({ //팀원
                where: whereCheckOption
            });
            const projectApplicantCheck = await ProjectApplicant.findOne({ //지원자
                where: whereCheckOption,
            });
            console.log(projectMemberCheck)
            console.log(projectApplicantCheck)

            let button = null;
            if (projectMemberCheck){
                button = false;
                console.log("프로젝트 팀원")
            }
            else if(projectApplicantCheck){
                button = false;
                console.log("프로젝트 지원자")
            }
            else{
                button = true;
                console.log("지원 가능!")
            }            

            const result = {
                Projects: {
                    UserId, id, limitUniv, startDate, endDate, createdAt, title, 
                    largeAddress, smallAddress, type, field, content, link, 
                    morning, night, dawn, plan, cramming, leader, follower, challenge, realistic,
                },
                ProjectPositions: projectPosition,
                ProjectMembers: projectMember,
                ProjectApplicant: projectApplicant,
                button
            }
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    readProject: async (UserId, title, type, field, position, largeAddress, smallAddress, limitUniv,
        morning, night, dawn, plan, cramming, leader, follower, challenge, realistic) => {
        try {
            let whereOption = {};
            let andOption = [];
            let includeWhereOption = {};
            let includeAndOption = []; 
            let orOption1 = [];
            let orOption2 = [];
            let orOption3 = [];
            let orOption4 = [];
            if(!title) { 
                if(!type && !field && !position && !largeAddress && !smallAddress && !limitUniv &&
                    !morning && !night && !dawn && !plan && !cramming && !leader && !follower && !challenge && !realistic) {
                    console.log('타이틀 없음 && 쿼리 없음'); // 타이틀 없음 && 쿼리 없음 => 목록 조회 (공개된 목록만!)
                    whereOption = { 
                        open: true
                    };
                } else {
                    console.log('타이틀 없음 && 쿼리 있음'); // 타이틀 없음 && 쿼리 있음 => 필터 적용 (공개된 목록만!)
                    // limitUniv는 true(전체), false(자대)로 전달
                    if(limitUniv) { 
                        if(!JSON.parse(limitUniv)){ //false일 경우
                            const user = await User.findByPk(UserId);
                            const { univ } = user;
                            limitUniv = univ;
                            console.log(limitUniv);
                        } else { //true일 경우
                            limitUniv = null;
                        }
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
                    type ? andOption.push({ type }) : null;
                    field ? andOption.push({ field }) : null;
                    largeAddress ? andOption.push({ largeAddress}) : null;
                    smallAddress ? andOption.push({ smallAddress }) : null;
                    limitUniv ? andOption.push({ limitUniv }) : null;
                    orOption1.length > 0 ? andOption.push({ [Op.or]: orOption1 }) : null;
                    orOption2.length > 0 ? andOption.push({ [Op.or]: orOption2}) : null;
                    orOption3.length > 0 ? andOption.push({ [Op.or]: orOption3}) : null;
                    orOption4.length > 0 ? andOption.push({ [Op.or]: orOption4}) : null;
                    whereOption = {
                        open: true,
                        [Op.and]: andOption
                    }

                    // Include And 옵션 추가
                    position ? includeAndOption.push({ position }) : null;
                    includeWhereOption = {
                        [Op.and]: includeAndOption
                    }
                }
            } else {
                if(!type && !field && !position && !largeAddress && !smallAddress && !limitUniv &&
                    !morning && !night && !dawn && !plan && !cramming && !leader && !follower && !challenge && !realistic) {
                    console.log('타이틀 있음 && 쿼리 없음'); // 타이틀 있음 && 쿼리 없음 => 검색 적용 (공개된 목록만!)
                    whereOption = { 
                        title: {
                            [Op.substring]: `${title}`
                        },
                        open: true
                    }
                } else {
                    console.log('타이틀 있음 && 쿼리 있음'); // 타이틀 있음 && 쿼리 있음 => 검색 + 필터 적용 (공개된 목록만!)
                    // limitUniv는 true(전체), false(자대)로 전달
                    if(limitUniv) { 
                        if(!JSON.parse(limitUniv)){ //false일 경우
                            const user = await User.findByPk(UserId);
                            const { univ } = user;
                            limitUniv = univ;
                            console.log(limitUniv);
                        } else { //true일 경우
                            limitUniv = null;
                        }
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
                    type ? andOption.push({ type }) : null;
                    field ? andOption.push({ field }) : null;
                    largeAddress ? andOption.push({ largeAddress}) : null;
                    smallAddress ? andOption.push({ smallAddress }) : null;
                    limitUniv ? andOption.push({ limitUniv }) : null;
                    orOption1.length > 0 ? andOption.push({ [Op.or]: orOption1 }) : null;
                    orOption2.length > 0 ? andOption.push({ [Op.or]: orOption2}) : null;
                    orOption3.length > 0 ? andOption.push({ [Op.or]: orOption3}) : null;
                    orOption4.length > 0 ? andOption.push({ [Op.or]: orOption4}) : null;
                    whereOption = { 
                        title: {
                            [Op.substring]: `${title}`
                        },
                        open: true,
                        [Op.and]: andOption
                    }

                    // Include And 옵션 추가
                    position ? includeAndOption.push({ position }) : null;
                    includeWhereOption = {
                        [Op.and]: includeAndOption
                    }
                }
            }
            const result = await Project.findAll({
                include: [ //inner join => position은 
                    {
                        model: ProjectPosition,
                        attributes: ['position', 'headCount'],
                        where: includeWhereOption
                    }
                ],
                attributes: [
                    'id', 'limitUniv', 'largeAddress', 'smallAddress', 
                    'startDate', 'endDate', 'title', 'type', 'field'
                ],
                order: [
                    ['createdAt', 'DESC'] //최신순 정렬
                ],
                where: whereOption
            });
            return result;
        } catch (error) {
            console.error(error);
            throw e;
        }
    },
    applyProject: async (UserId, MemberId, ProjectId) => {
        try {
            await ProjectApplicant.create({
                UserId,
                MemberId,
                ProjectId
            });
        } catch (error) {
            console.error(error);
            throw e; 
        }
    },
    memberProject: async (UserId, MemberId, ProjectId) => {
        try {
            await ProjectMember.update({
                MemberId},
            {
                where: {
                    UserId,
                    ProjectId
                }
            });
        } catch (error) {
            console.error(error);
            throw e;
        }
    }
}