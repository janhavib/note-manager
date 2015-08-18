var lowdb = require('lowdb');
var db = lowdb('db.json');
db._.mixin(require('underscore-db'));


module.exports = function(app){
    app.get('/', defaultRoute);

    app.post('/notes',createNote);

    app.get('/notes', fetchNotes);

    app.get('/notes/:id', getNote);

    app.put('/notes', updateNote);
}

function defaultRoute(req, res){
        res.sendfile('./public/index.html');
}

function createNote(req, res){
    var id;
    if(req.body){
        var noteDesc = req.body.notedesc;
        var noteDate = req.body.noteDate; 
        //Check if notes exist else initialize id
        if(db.object.notes === undefined){
            id = 1;
        }else{
            id = db.object.notes.length + 1;
        }
        //insert the note
        var noteId = db('notes').insert({ id: id, noteDesc: noteDesc, noteDate : noteDate }).id;

        var note = db('notes').getById(noteId);
        if(note){
            res.send("Sucessfully created note");
        }else{
            res.send("Error creating note");
        }
    }

}

function fetchNotes(req, res){
    if(db.object.notes){
        var allNotes = db.object.notes;
        res.send(allNotes);
    }else{
        //send back and empty array
        res.send([]);
    }
}

function getNote(req, res){
    var noteId = parseInt(req.params.id);
    if(noteId){
        var note = db('notes').getById(noteId);
    }
    if(note){
        res.send(note);
    }else{
        res.send("Error fetching note");
    }
}


function updateNote(req, res){
    if(req.body){
        db('notes')
        .chain()
        .find({ id: req.body.id })
        .assign({ noteDesc: req.body.noteDesc})
        .value()
        res.send("Successfully updated");
    }else{
        res.send("Error updating note");
    }
}

