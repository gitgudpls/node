var mongoose = require('mongoose');
var moment = require('moment');
var hash = require('../utils/hash');

var userSchema = mongoose.Schema({
	_id: String,
	password: String,
	email: String,
	phone: String,
	createdAt: Date
});

var User = mongoose.model('User', userSchema);

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phoneRegex = /^\(?[0-9]{3}\)?[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{4}$/;

var isUserValid = function(user) {
	return phoneRegex.test(user.phone) && emailRegex.test(user.email);
};

var checkIfUsernameValid = function(username, callback) {
	User.count({ _id : username }, function(err, count) {
		if(err || count != 0) {
			callback(false);
		};
		callback(true);
	});
};

module.exports = function(userValues) {
	if(isUserValid(userValues)) {
		checkIfUsernameValid(userValues.username, function(valid) {
			if(valid) {
				var today =  moment().startOf('day').toDate();
				var hashPassword = hash.hashString(userValues.password);
				var user = new User({
					_id: userValues.username,
					password: hashPassword,
					email: userValues.email,
					phone: userValues.phone,
					createdAt: today
				});
				user.save(function(err) {});	
			}
		});
	}
};
