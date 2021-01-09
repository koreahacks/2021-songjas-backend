const projectService = require('../services/project-service');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');

module.exports = {
    uploadProjectImage: async (req, res) => {
        if(!req.file) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            console.log(req.file);
            const result = { img: req.file.location };
            return res.status(sc.CREATED).send(rb.successData(sc.CREATED, rm.PROJECT_IMAGE_UPLOAD_SUCCESS, result));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROJECT_IMAGE_UPLOAD_FAIL));
        }
    },
    createProject: async (req, res) => {
        const { 
            img, room, title, type, field, startDate, endDate, content, link,
            morning, night, dawn, plan, cramming, leader, follower, challenge, realistic, 
            largeAddress, smallAddress, limitUniv, ProjectMembers, ProjectPositions 
        } = req.body;
        if(img === undefined || !room || !title || !type || !field || !startDate || !endDate || !content || link === undefined ||
            morning === undefined || night === undefined || dawn === undefined || 
            plan === undefined || cramming === undefined || leader === undefined || 
            follower === undefined || challenge === undefined || realistic === undefined ||
            !largeAddress || !smallAddress || limitUniv === undefined || !ProjectMembers || !ProjectPositions) {
            console.log(req.body);
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            let project = req.body;
            project.UserId = req.decoded;
            console.log(project);
            
            console.log(req.body);
            await projectService.createProject(project);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PROJECT_CREATE_SUCCESS));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROJECT_CREATE_FAIL));
        }
    },
    readProjectContent: async (req, res) => {
        try {
            let result = await projectService.readProjectContent(req.params.id, req.decoded);
            const { Projects, ProjectPositions, ProjectMembers, ProjectApplicant, button } = result;
            result = {
                status: sc.OK,
                success: true,
                message: rm.PROJECT_CONTENT_READ_SUCCESS,
                Projects,
                ProjectPositions,
                ProjectMembers,
                ProjectApplicant,
                button
            }
            return res.status(sc.OK).send(result);
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROJECT_CONTENT_READ_FAIL));
        }
    },
    applyProject: async (req, res) => {
        const { MemberId, ProjectId } = req.body;
        if(!MemberId || !ProjectId) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await projectService.applyProject(req.decoded, MemberId, ProjectId);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PROJECT_APPLY_SUCCESS));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROJECT_APPLY_FAIL));
        }
    },
    memberProject: async (req, res) => {
        const { MemberId, ProjectId } = req.body;
        if(!MemberId || !ProjectId) {
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            await projectService.memberProject(req.decoded, MemberId, ProjectId);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.PROJECT_MEMBER_SUCCESS));
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.PROJECT_MEMBER_FAIL));
        }
    },
}