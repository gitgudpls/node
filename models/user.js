var mongoose = require('mongoose');
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
var phoneRegex = /^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0‌​-9]{4}$/;

var isUserValid = function(user) {
	return phoneRegex.test(user.phone) && emailRegex.test(user.email);
};

var isUsernameFree = function(user) {
	User.count({_id: user.username}, function(err, count) {
		return count == 0;
	});
};

module.exports = function(user) {
	if(isUserValid(user) && isUsernameFree(user)) {
		var today =  moment().startOf('day').toDate();
		var hashPassword = hash.hashString(user.password);
		return new User({
							_id: user.username,
							password: hashPassword,
							email: user.email,
							phone: user.phone,
							createdAt: today;
						});
	};
	return false;
};
