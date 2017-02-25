var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


/* Connecting with MongoDB database via Mongoose */
var mongoose = require('mongoose');
var config = require('./mongoose-config.json');
var Student = require('./models/Student.js');

// mongoose.connect('mongodb://localhost:27017/college_db');
mongoose.connect(config.connectionString, function(err) {
	if(err)
		console.log('Mongoose connection failed: ' + err);
	else
		console.log('Mongoose connected to: ' + config.connectionString);
});

var db = mongoose.connection;


/* Static HTML/CSS/JS */
app.use(express.static(__dirname + '/static'));


/* Test */
app.get('/test', function(req, res) {

	console.log("In method test.");
	res.end("<h1 style='background:#ef5434; color:white;'>hurray!! mcq web service is working.</h1>");
});


/* Creating a RESTful API using the Mongoose model */

/* When user goes to /student/ dir, fetch students data from DB */
app.get('/student', function(req, res) {

	Student.getStudents(function(err, student_details) {
		if(err) {
			throw err;
		}
		else {
			res.json(student_details);
		}
	} /* , 10 (no limit needed) */);
});

/* Searching a student by object id */
app.get('/student/:id', function(req, res) {

	var id = req.params.id;
	Student.getStudentById(id, function(err, stud) {
		if(err) {
			throw err;
		}

		res.json(stud);
	});
});

/* Searching a student by name */
app.get('/studentname/:name', function(req, res) {

	var name = req.params.name;
	Student.getStudentByName(name, function(err, stud) {
		if(err) {
			throw err;
		}

		res.json(stud);
	});
});

/* Adding a new student (POST req example) */
/* POST via curl: 
   curl -H "Content-Type:application/json" -X POST -d '{ "name": "New", "age": "11" }' http://localhost:8081/addstudent */
app.post('/addstudent', function(req, res) {

	var student = req.body;
	Student.addStudent(student, function(err, stud) {
		if(err) {
			throw err;
		}

		res.json(stud);
	});
});


/* Delete student (DELETE req example) */
/* DELETE via curl: 
   curl -H "Content-Type:application/json" -X DELETE http://localhost:8081/delstudent/Zyng */
app.del('/delstudent/:name', function(req, res) {

	var name = req.params.name;
	Student.delStudent(name, function(err, stud) {
		if(err) {
			throw err;
		}

		res.json(stud);
	});
});


/* Starting the server */
var server = app.listen(8081);
