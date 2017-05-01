var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

var User = mongoose.model('User');

var router = express.Router();

// Set up auth
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

// Related functions
var sendJSONResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

var register = function(req, res) {
	if(!req.body.name || !req.body.email || !req.body.password) {
		sendJSONResponse(res, 400, {
			message: 'Please fill all the fields.'
		});
		return;
	}

	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;
	user.avatar = req.body.avatar;
	user.setPassword(req.body.password);

	user.save(function(err) {
		if(err) {
			sendJSONResponse(res, 401, {
				message: 'This email id is already registered.'
			});
			return;
		}

		var token = user.generateJwt();
		res.status(200);
		res.json({
			token: token
		});
	});
};

var login = function(req, res) {
/*	if(!req.body.email || !req.body.password) {
		sendJSONResponse(res, 400, {
			message: 'Please fill all the fields.'
		});
		return;
	}
*/
	passport.authenticate('local', function(err, user, info) {
		var token;

		// If Passport throws/catches an error
		if(err) {
			res.status(404).json(err);
			return;
		}

		// If a user is found
		if(user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				token: token
			});
		}
		// Otherwise user is not found
		else {
			res.status(401).json(info);
		}
	})(req, res);
};

var profileRead = function(req, res) {
	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile'
		});
	}
	else {
		User.findById(req.payload._id).exec(function(err, user) {
			res.status(200).json(user);
		});
	}
};

// Configure API routes using the functions
// Profile info
router.get('/profile', auth, profileRead);
// Registration
router.post('/register', register);
// Login
router.post('/login', login);

module.exports = router;
