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