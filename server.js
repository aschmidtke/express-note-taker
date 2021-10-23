const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const notes = require('./db/db.json');

// loads notes page with 'Get Started' button
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// displays existing notes
app.get('/api/notes', function (req, res) {
    fs.readFile('db/db.json', 'UTF-8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(notes);
    });
});

// write new note
app.post('/api/notes', function (req, res) {
    let id = uniqid.time();
    //console.log(id);
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    let displayNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile('db/db.json', displayNote, (err) => {
        if (err)
        console.log(err);
    });
});

// delete note
app.delete('/api/notes/:id', function (req, res) {
    let noteID = req.params.id;
    fs.readFile('db/db.json', 'UTF-8', function (err, data) {
        let updatedNotes = JSON.parse(data).filter((note) => { // somewhere in here
            return note.id !== noteID;
        });
        //notes = updatedNotes;
        let displayNote = JSON.stringify(updatedNotes);
        fs.writeFileSync('db/db.json', displayNote, (err) => {
            if (err)
            console.log(err);
        });
    });
});


// starts server
app.listen(PORT, function () {
    console.log(`API server now on port 3001`);
});