const express = require('express');
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const notes = require('./db/db.json');


app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.listen(PORT, function () {
    console.log(`API server now on port 3001`);
});