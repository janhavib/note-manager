'use strict';
var app = angular.module('notemanager',['ngRoute', 'ngTable']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/notes',{
        templateUrl : 'partials/noteList.html',
        controller : 'noteListController'
    }).when('/notes/:id',{
        templateUrl : 'partials/noteEdit.html',
        controller : 'noteEditController'
    }).when('/',{
        templateUrl: 'partials/noteCreate.html',
        controller: 'noteController'
    })

}])