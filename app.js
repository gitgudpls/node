var express = require('express');
require('./utils/database');
var userConstructor = require('./models/user');
var app = express();

app.get('/api', function(req, res) {
	userConstructor({
		username: req.query.usern,
		password: req.query.pwd,
		email: req.query.email,
		phone: req.query.phone	
	});
	res.send('processing');
});

app.listen(3000);
