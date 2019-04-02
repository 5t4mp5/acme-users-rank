const express = require("express");
const app = express();
const { db, User } = require("./db");
const seed = require("./seed");
const path = require("path");

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "dist", "main.js"))
);

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);
app.get("/api/users", (req, res, next) => {
  User.findAll({ order: [["rank", "ASC"]] })
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

app.get("/api/users/:id", (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.json(user))
    .catch(next);
});

app.post("/api/users", (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

app.put("/api/users/:id", (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => user.update(req.body))
    .then(user => res.status(202).json(user))
    .catch(next);
});

app.delete(`/api/users/:id`, (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((error, req, res, next) => {
  console.log(error.errors);
  console.log(Object.keys(error));
  let errors = [error];
  if (error.errors) {
    error = error.errors.map(_error => {
      return _error.message;
    });
  } else if (error.original) {
    errors = [error.original.message];
  }
  res.status(error.status || 500).send({ errors });
});

db.authenticate()
  .then(() => db.sync({ force: true }))
  .then(() => seed())
  .then(() => console.log("DB SYNC AND SEED COMPLETE"))
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch(e => console.log(e.message));
