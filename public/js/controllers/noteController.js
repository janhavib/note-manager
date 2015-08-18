'use strict';
var app = angular.module('notemanager');

app.controller('noteController',['$scope','NoteService','$location', function($scope, NoteService, $location){
	$scope.note = {};
   
    $scope.saveNote = function(){
        var params = $scope.note;
        params.noteDate = new Date();
        //validate the note and then save..
        if(params.notedesc){
             NoteService.saveNote(params,function(err, data){
                if(err){
                    alert(err);
                }else{
                    alert(data);
                    $location.path('notes');
                }
             });
        }
    }
}]);