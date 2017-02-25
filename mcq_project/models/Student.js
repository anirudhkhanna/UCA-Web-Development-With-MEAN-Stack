var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: String
	}
});

var Student = mongoose.model('student', studentSchema); /* collection name (can be in singular, Mongoose will automatically search)
                                                           and schema object name */

/* Creating a query API */
module.exports.getStudents = function(callback, limit) {

	Student.find(callback).limit(limit);
}

module.exports.getStudentById = function(id, callback) {

	Student.findById(id, callback);	// id is unique in mongo, so no limit necessary
}

module.exports.getStudentByName = function(name_param, callback) {

	var query = {name: name_param};
	Student.findOne(query, callback);
}

module.exports.addStudent = function(param, callback) {

	Student.create(param, callback);
}

module.exports.delStudent = function(name_param, callback) {

	var query = {name: name_param};
	Student.remove(query, callback);
}
