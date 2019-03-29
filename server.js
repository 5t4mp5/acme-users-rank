const express = require('express');
const app = express();
const { db } = require("./db");
const seed = require("./seed");
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

db.authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => seed())
    .then(() => console.log("DB SYNC AND SEED COMPLETE"))
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => console.log(e.message));


