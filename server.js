const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express()
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
    let id = String + Date.now();
    let newNote = {
        id: id,
        title: req.body.title,
        text: req.body.text
    };
    notes.push(newNote);
    const displayNote = JSON.stringify(notes);
    res.json(notes);
    fs.writeFile('db/db.json', displayNote, (err) => {
        if (err)
        console.log(err);
    });
});


// starts server
app.listen(PORT, function () {
    console.log(`API server now on port 3001`);
});