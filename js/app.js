"use strict"

var app = angular.module('fljApp', ['ngRoute', 'ui.bootstrap', 'alj.controllers', 'alj.directives', 'alj.services']);


app.factory('httpInterceptor', function ($q, $rootScope, $log) {

    var numLoadings = 0;

    return {
        request: function (config) {

            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config)

        },
        response: function (response) {

            if ((--numLoadings) === 0) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return response || $q.when(response);

        },
        responseError: function (response) {

            if (!(--numLoadings)) {
                // Hide loader
                $rootScope.$broadcast("loader_hide");
            }

            return $q.reject(response);
        }
    };
});
//.config(function ($httpProvider) {
//   $httpProvider.interceptors.push('httpInterceptor');
//});

app.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push('httpInterceptor');
	$routeProvider
		.when('/home', {templateUrl: 'templates/partials/aboutus.html'})
		.when('/ourparty', {templateUrl: 'templates/partials/weddingparty.html'})
		.when('/locations', {templateUrl: 'templates/partials/eventlocations.html'})
		.when('/contact', {templateUrl: 'templates/partials/contactus.html'})
		.otherwise({ redirectTo : '/home', templateUrl: 'templates/partials/aboutus.html'});
});