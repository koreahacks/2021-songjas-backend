const memberService = require('../services/member-service');
const rb = require('../modules/response-body');
const rm = require('../modules/response-message');
const sc = require('../modules/status-code');

module.exports = {
    createMember: async (req, res) => {
        const { title, type, field, content, link, open, MemberPositions, MemberActivities } = req.body;
        if(!title || !type || !field || !content || link === undefined || open === undefined || 
            !MemberPositions || !MemberActivities) { //링크는 allowNull
            return res.status(sc.BAD_REQUEST).send(rb.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }
        try {
            let member = req.body;
            member.UserId = req.decoded; //Json Key, Value 추가

            await memberService.createMember(member);
            return res.status(sc.CREATED).send(rb.success(sc.CREATED, rm.MEMBER_CREATE_SUCCESS));            
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_CREATE_FAIL));
        }
    },
    readMember: async (req, res) => {
        const { title, type, field, position, largeAddress, smallAddress, limitUniv,
                    morning, night, dawn, plan, cramming, leader, follower, challenge, realistic } = req.query;
        //목록 조회, 검색, 필터 포함 응답 메시지
        try {
            const result = await memberService.readMember(
                req.decoded, title, type, field, position, largeAddress, smallAddress, limitUniv,
                morning, night, dawn, plan, cramming, leader, follower, challenge, realistic 
            );
            return res.status(sc.OK).send(rb.successData(sc.OK, rm.MEMBER_LIST_READ_SUCCESS, result));
                                
        } catch (error) {
            console.error(error);
                return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_LIST_READ_FAIL));
        }
    },
    readMemberContent: async (req, res) => {
        try {
            let result = await memberService.readMemberContent(req.params.id, req.decoded);
            const { Users, Members, MemberPositions, MemberActivities } = result;
            result = {
                status: sc.OK,
                success: true,
                message: rm.MEMBER_CONTENT_READ_SUCCESS,
                Users,
                Members,
                MemberPositions,
                MemberActivities
            }
            return res.status(sc.OK).send(result);
                        
        } catch (error) {
            console.error(error);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(rb.fail(sc.INTERNAL_SERVER_ERROR, rm.MEMBER_CONTENT_READ_FAIL));
        }
    },
}