require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const session = require("express-session");

const app = express();

let connection;

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "todoapp",
  })
  .then((con) => {
    connection = con;
  });

app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login/:username", (req, res) => {
  req.session.username = req.params.username;

  console.log("/login/:username", req.session.username);

  res.send();
});

app.get("/todos", async (req, res) => {
  console.log("/todos", req.session.username);

  if (!req.session.username) {
    return res.status(401).send();
  }

  const [
    rows,
  ] = await connection.execute("SELECT * FROM todos WHERE author = ?", [
    req.session.username,
  ]);

  res.json(rows);
});

app.post("/todos", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO todos (title, author) VALUES (?, ?)",
    [req.body.title, req.body.author]
  );

  res.json({
    id: rows.insertId,
    title: req.body.title,
    author: req.body.author,
  });
});

app.delete("/todos/:id", async (req, res) => {
  console.log(req.params.id);

  const [rows] = await connection.execute("DELETE FROM todos WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 1) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.listen(5555);
