/* Set up Node server and RESTful API */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./db_config.json');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));


/* Mongoose connection */
var mongoose = require('mongoose');

mongoose.connect(config.connectionString, function(err) {
	if(err)
		console.log('Mongoose connection to ' + config.connectionString + ' failed: ' + err);
	else
		console.log('Mongoose connected to: ' + config.connectionString);
});

Student = require('./models/Student');


/* Test URLs etc. */
app.get('/',function(req, res) {
	res.send('Hello, world! My DB path = ' + config.connectionString);
});

app.get('/test',function(req, res) {
	console.log("In method test. Sample College project is working.");
	res.send('<h2>Hurray! Sample College project is working.</h2>');
});


/* REST API using Mongoose model */

// Get all students
app.get('/student/', function(req, res) {
	Student.getStudent(function(err, students) {
		if(err) {
			throw err;
		}
		res.json(students);
	});
});

// Get a student by id
app.get('/student/:_id', function(req, res) {
	Student.getStudentById(req.params._id, function(err, student) {
		if(err) {
			throw err;
		}
		res.json(student);
	});
});

// Add a new student
app.post('/student/', function(req, res) {
	var student = req.body;
	Student.addStudent(student, function(err, student) {
		if(err) {
			throw err;
		}
		res.json(student);
	});
});

// Update a student
app.put('/student/:_id', function(req, res) {
	var student = req.body;
	var id = req.params._id;
	Student.updateStudent(id, student, function(err, student) {
		if(err) {
			throw err;
		}
		res.json(student);
	});
});

// Delete a student
app.delete('/student/:_id', function(req, res) {
	var id = req.params._id;
	Student.deleteStudent(id, function(err, student) {
		if(err) {
			throw err;
		}
		res.json(student);
	});
});


/* Start the server */
var server = app.listen('8080', function() {
	console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
