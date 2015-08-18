'use strict';
var app  = angular.module('notemanager');

app.controller('noteEditController', ['$scope', 'NoteService','$location', function($scope, NoteService, $location){
    $scope.note = {};
    $scope.editable = true;
    $scope.btnAction = "Edit";
    $scope.getNote = function(params, callback){
        NoteService.getNote(params, function(err, data){
            if(err){
                callback(err, null);
            }else{
                $scope.note = data;
                callback(null, data);
            }
        });
    }

    var path = $location.path();
    var url = path.split('/');
    var noteId = url[url.length -1];
    $scope.getNote(noteId, function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });

    $scope.editForm = function(){
        if($scope.btnAction == "Edit"){
            $scope.editable = false;
            $scope.btnAction = "Cancel";
        }else if($scope.btnAction === "Cancel"){
            $scope.editable = true;
            $location.path('notes');
        }
    }

    $scope.updateNote = function(params, callback){
        params = $scope.note;
        NoteService.updateNote(params, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
                $location.path('notes');
            }
        });
    }
}])