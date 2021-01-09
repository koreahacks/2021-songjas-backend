var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Add Router. */
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/members', require('./members'));
router.use('/projects', require('./projects'));

module.exports = router;
