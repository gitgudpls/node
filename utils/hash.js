var crypto = require('crypto');

var hash = {};

hash.hashString = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

hash.isStringEqualToHash = function(str, hash) {
	return hashString(str) === hash;
};

module.exports = hash;
