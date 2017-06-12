var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
	if(req.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			var oldpath = files.myupload.path;
			var newpath = 'uploads/' + files.myupload.name;
			fs.rename(oldpath, newpath, function(err) {
				if(err) {
					res.write('An error occurred! ');
					res.write(err.message);
					res.end();
					return;
				}
				res.write('File uploaded successfully!');
				res.end();
			});
		});
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
		res.write('<input type="file" name="myupload"><br>');
		res.write('<input type="submit">');
		res.write('</form>');
		return res.end();
	}
});

server.listen(8080);
