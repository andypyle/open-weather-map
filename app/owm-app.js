var app = angular.module('OWMApp', ['ngRoute']);

	app.run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function(){
			$location.path('/error');
		});
	});

	app.value('owmCities', ['San Luis Obispo', 'Los Angeles', 'San Francisco', 'Portland', 'Seattle']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/cities/:city', {
            templateUrl : 'city.html',
            controller : 'CityCtrl',
            resolve : {
            	city: function(owmCities, $route, $location){
            		var city = $route.current.params.city;
            		if(owmCities.indexOf(city) == -1){
            			$location.path('/error');
            			return;
            		}
            		return city;
            	}
            }
        }).when('/error', {
        	template : '<h1>Error: Not found.</h1>'
        });
    }]);

    app.controller('HomeCtrl', function($scope) {
        //empty for now
    });

    app.controller('CityCtrl', function($scope, city) {
    	$scope.city = city;
	});