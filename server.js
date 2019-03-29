const express = require('express');
const app = express();
const { db, User } = require("./db");
const seed = require("./seed");
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/users', (req, res, next) => {
    User.findAll({ order: [["rank", "ASC"]] })
        .then(users => res.json(users))
        .catch(e => console.log(e));
});

db.authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => seed())
    .then(() => console.log("DB SYNC AND SEED COMPLETE"))
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => console.log(e.message));


