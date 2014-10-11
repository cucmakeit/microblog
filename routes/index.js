var express = require('express');
var crypto = require('crypto');
var User = require('../models/user')
var session = require('express-session');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: '首页' });
});

/*用户主页*/
router.get('/u/:user', function(req, res){
	res.send('user: '+ req.params.username);
});

/*发表信息*/
router.post('/post', function(req, res){

});

/*用户注册*/
router.get('/reg', function(req, res){
	res.render('reg', { title: '用户注册'})
});

router.post('/reg', function(req, res){
	// 检验用户两次输入的口令是否一致
	if(req.body['password-repeat'] != req.body['password']) {
		req.flash('error', '两次输入的密码不一致');
		return res.redirect('/reg');
	}

	// 生成密码的散列值
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	

	var newUser = new User({
		name: req.body.username,
		password: password,
	});

	// 检查用户名是否已经存在
	User.get(newUser.name, function(err, user){
		if(user)
			err = '用户名已存在.';
		if(err){
			req.flash('error', err);
			return res.redirect('/reg');
		}
		// 如果不存在则新增用户
		newUser.save(function(err, user){
			if(err){
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = user;
			req.flash('success', '注册成功.');
			res.redirect('/');
		});			
	});
});

/*用户登录*/
router.get('/login', function(req, res){

});

router.post('/doLogin', function(req, res){

});

/*用户登出*/
router.get('/logout', function(req, res){

});

module.exports = router;
