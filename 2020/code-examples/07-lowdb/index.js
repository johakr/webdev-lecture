const express = require("express");
const app = express();
const nanoid = require("nanoid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ todos: [] }).write();

app.use(express.json());

app.get("/api/todos", (req, res) => {
  const todos = db.get("todos");

  return res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;

  todo.id = nanoid();

  db.get("todos")
    .push(todo)
    .write();

  return res.status(201).json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = db
    .get("todos")
    .find({ id: req.params.id })
    .assign({ title: req.body.title })
    .write();

  return res.json(todo);
});

app.listen(3000);
