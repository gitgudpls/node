var express = require('express');
var userConstructor = require('./models/user');
var app = express();

app.get('/api', function(req, res) {
	res.send(userConstructor({
		username: req.query.usern,
		password: req.query.pwd,
		email: req.query.email,
		phone: req.query.phone	
	}));
});

app.listen(3000);
