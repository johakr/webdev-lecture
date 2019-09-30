const express = require("express");
const app = express();

const todos = require("./todos.json");

let idCount = todos.length;

app.use(express.json());
app.use(express.static("public"));

app.get("/api/todos", (req, res) => {
  if (req.query.userId !== undefined) {
    return res.json(
      todos.filter(todo => todo.userId === parseInt(req.query.userId))
    );
  }

  return res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));

  if (!todo) return res.status(404).json({ error: "not found" });

  return res.json(todo);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;

  todo.id = ++idCount;

  return res.status(201).json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));

  if (!todo) return res.status(404).json({ error: "not found" });

  todo.title = req.body.title;
  todo.title = req.body.completed;

  return res.json(todo);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));

  if (!todo) return res.status(404).json({ error: "not found" });

  todo = { ...todo, ...req.body };

  return res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todoIdx = todos.findIndex(todo => todo.id === parseInt(req.params.id));

  if (todoIdx === -1) return res.status(404).json({ error: "not found" });

  todos.splice(todoIdx, 1);

  return res.status(204).send();
});

app.listen(3000);
