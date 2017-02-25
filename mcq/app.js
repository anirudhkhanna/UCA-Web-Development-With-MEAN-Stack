var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());


var mongoose = require('mongoose');
var config = require('my-mongoose-config.json')
var Student = require('./models/Student.js');

/*mongoose.connect('mongodb://localhost:27017/CollegeDB');*/
mongoose.connect(config.connectionString, function(err) {
	if(err)
		console.log('Mongoose connection failed: ' + err);
	else
		console.log('Connected to: ' + config.connectionString);
});

var db = mongoose.connection;


app.use(express.static(__dirname + '/static'));

app.get('/test', function(req, res){

  console.log("In method test");
  res.end("<h1 style='background:#ef5434; color: white;'>hurray!! <span style='color:#ef5434; background: white;'>mcq1 web service</span> is working</h1>")
});


/* When user goes to /student/ dir, fetch student data from DB */
app.get('/student', function(req, res) {

	Student.getStudent(function(err, student_details) {
		if(err) {
			throw err;
		}
		else {
			console.log(student_details)
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

/* Post req example */
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


/* Delete student */
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


/* Update student */
/*
app.put('/student/:name', function(req, res) {

	var name = req.params.name;
	Student.delStudent(name, function(err, stud) {
		if(err) {
			throw err;
		}

		res.json(stud);
	});	
});
*/


var server = app.listen(8081)
