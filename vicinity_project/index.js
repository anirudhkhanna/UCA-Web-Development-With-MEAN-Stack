
console.log('\n\
			 Vicinity\n\
			 ********\
			');

var request = require('request');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));

/* API keys (Set the keys as config vars) */
var GOOGLE_GEOCODING_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
var GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;


/* Set up the server */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', function() {
	console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});

function normalizePort(val) {
	var port = parseInt(val, 10);
	if(isNaN(port))
		return val;
	if(port >= 0)
		return port;
	return false;
}


/* Server request handlers */
app.post('/getplacesnearby', function(req, res) {

	var query = req.body;
	getLocationData(query.address, function(err, locationData) {

		if(err) {
			console.log(err.message);
			res.status(404).json(err);
			return;
		}

		console.log(locationData);

		var address = locationData.address;
		var latLong = locationData.lat + "," + locationData.long;
		var type = query.type;
		var limit = 50;
		getNearbyPlaces(latLong, type, limit, function(err, nearbyPlacesData) {

			if(err) {
				console.log(err.message);
				res.status(404).json(err);
				return;
			}

			nearbyPlacesData.locationData = locationData;
			console.log('Fetched nearbyPlacesData');
			res.json(nearbyPlacesData);
		});
	});
});


/* Get location data */
function getLocationData(address, callback) {

	var formattedAddress = address.replace(/\s+/g, ' ').trim().replace(/ /g, '+');
	var geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + formattedAddress + '&key=' + GOOGLE_GEOCODING_API_KEY;

	request(geocodingUrl, function(err, res, body) {
		if(err) {
			console.log(err);
			callback ({
				message: 'This location could not be pin-pointed on mother earth. Please try again.'
			}, null);
			return;
		}

		body = JSON.parse(body);

		if(body.status != 'OK') {
			console.log(body.status);
			callback ({
				message: 'This location could not be pin-pointed on mother earth. Please try again.'
			}, null);
			return;
		}

		var result = body.results[0];
		var locationData = {
			lat: result.geometry.location.lat,
			long: result.geometry.location.lng,
			address: result.formatted_address
		};

		callback(null, locationData);
		return;
	});
}


/* Get nearby places */
function getNearbyPlaces(latLong, type, limit, callback) {

	var placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latLong + '&radius=1000&types=' + type + '&key=' + GOOGLE_PLACES_API_KEY;

	request(placesUrl, function(err, res, body) {
		if(err) {
			callback(err, null);
			return;
		}

		body = JSON.parse(body);

		if(body.status != 'OK') {
			console.log(body.status);
			if(body.status == 'OVER_QUERY_LIMIT') {
				callback ({
					message: 'Query limit is reached. Please try again in some time.'
				}, null);
				return;
			}

			callback ({
				message: 'Sorry, nearby places could not be found.'
			}, null);
			return;
		}

		var results = body.results.slice(0, limit);
		var nearbyPlacesData = {
			results: []
		};

		for(var i = 0; i < results.length; i++) {
			var place = {};
			place.name = results[i].name;
			place.address = results[i].vicinity;
			place.types = results[i].types.slice(0, 2);
			for(var idx = 0; idx < place.types.length; idx++)
				place.types[idx] = place.types[idx].replace(/_/g, ' ');
			if(results[i].photos)
				place.photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + results[i].photos[0].photo_reference + '&key=' + GOOGLE_PLACES_API_KEY;
			else
				place.photo = '/img/location-placeholder-photo.png';

			nearbyPlacesData.results.push(place);
		}

		callback(null, nearbyPlacesData);
		return;
	});
}
