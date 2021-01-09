var express = require('express');
var router = express.Router();
const { checkToken } = require('../middleware/auth');
const projectController = require('../controllers/project-controller');



module.exports = router;