'use strict';
var app = angular.module('notemanager');

app.controller('noteListController', ['$scope', 'NoteService', 'ngTableParams', function($scope, NoteService, ngTableParams){
    $scope.notes = [];
    $scope.displayMsg = false;
    NoteService.fetchNotes(function(err, data){
        if(err){
            console.log(err);
        }else{
            if(data.length>0){
                $scope.notes = data;
            }else{
                $scope.displayMsg = true;
                $scope.msg = "No notes found!";
            }
        }
    })
}])