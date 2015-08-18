'use strict';
var app = angular.module('notemanager');

app.factory('NoteService',['$http',function($http){
    var noteService = {
        saveNote : saveNote,
        fetchNotes : fetchNotes,
        getNote : getNote,
        updateNote : updateNote
    }
    return noteService;
    function saveNote(params, callback){
        if(params){
            $http.post('/notes', params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            });        
        }else{
            callback("Invalid params", null);
        }
    }

    function fetchNotes(callback){
        $http.get('/notes').success(function(response){
            callback(null, response);
        }).error(function(error){
            callback(error, null);
        })
    }

    function getNote(params, callback){
      var id = params;
      if(params){
          $http.get('/notes/'+id).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })  
       }else{
            callback("Invalid Id", null);
       }
    }

    function updateNote(params, callback){
        if(params){
            $http.put('/notes',params).success(function(response){
                callback(null, response);
            }).error(function(error){
                callback(error, null);
            })
        }else{
            callback("Invalid Params", null);
        }
    }
    
}]);