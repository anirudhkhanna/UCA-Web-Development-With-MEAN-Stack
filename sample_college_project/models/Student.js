/* Student model to work with Mongoose */

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {

	}
});

var Student = mongoose.model('student', studentSchema);

/* CRUD API with Mongoose */
module.exports.getStudent = function(callback, limit) {
	Student.find(callback).limit(limit);
}

module.exports.getStudentById = function(id , callback) {
	Student.findById(id, callback);
}

module.exports.addStudent = function(student, callback) {
	Student.create(student, callback);
}

module.exports.updateStudent = function(id, student, callback) {
	var query = { _id: id };
	var update = { age: student.age };

	Student.findOneAndUpdate(query, update, callback);
}

module.exports.deleteStudent = function(id, callback) {
	var query = { _id: id };
	Student.remove(query, callback);
}
