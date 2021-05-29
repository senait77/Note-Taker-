var db;
const fs = require('fs');

//Module that will generate the notes's ID 
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    loadDb(function(db){
      res.json(db.notes);
    });
   
  });

  // API POST Requests
  app.post("/api/notes", function(req, res) {
    loadDb(function(db){
      console.log(req.body);
      var newNote = req.body;
      newNote.id = uuidv4();
      console.log(newNote);
      console.log('db', db);
      db.notes.push(newNote);
      res.json(newNote);

      if (saveDb(db)) {
        res.json({ success: true });
      }
      
    });
      
  })

  //Delete saved note
  app.delete("/api/notes/:id", function(req, res) {
    loadDb(function(db){
      const deleteId = req.params.id;
      for (let i=0; i< db.notes.length; i++) {
        if (db.notes[i].id === deleteId) {
          // removes the i element from array
          db.notes.splice(i,1);
          saveDb(db);
          break;
        }
      }
      res.json(db.notes);
    });

    //return the data as JSON in the response
   
  });

};
function loadDb(callback) {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data after load", data);
    callback(JSON.parse(data));

  });
}

function saveDb(db) {
  if (!db) {
    db = {notes: []}
  }
  console.log("DB BEFORE WRITE: ", db);
  fs.writeFile('./db/db.json', JSON.stringify(db), err => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
}

