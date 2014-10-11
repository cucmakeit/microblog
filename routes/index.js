var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/time', function(req, res){
	res.send('The time is ' + new Date().toString());
});

router.get('/user/:username', function(req, res){
	res.send('user: '+ req.params.username);
});
module.exports = router;
