const { Project, ProjectPosition, ProjectMember, User } = require('../models');

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
}