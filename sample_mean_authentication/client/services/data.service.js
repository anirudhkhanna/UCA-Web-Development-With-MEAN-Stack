var app = angular.module('meanApp');

app.service('meanData', function($http, authentication) {
	var getProfile = function() {
		return $http.get('/api/profile', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	return {
		getProfile: getProfile
	};
});
