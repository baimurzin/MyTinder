/**
 * Created by vbaimurzin on 03.11.2015.
 */

var express = require('express');
var router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));
router.use('/media', require('./media'));
router.use('/test',  require('./test'));

router.get('/', function (req, res) {
    res.status(200).json({msg: "api is running", status: "ok"});
});

module.exports = router;