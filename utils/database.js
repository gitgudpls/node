var mongoose = require('mongoose');
var	config = require('../config/database');

var db = config.dbName;
var login = config.dbUser + ':' + config.dbPassword + '@' || '';
var host = config.host || '127.0.0.1';
var port = config.port || '27017';

mongoose.connect('mongodb://' + login + host + ':' + port + '/' + db);
