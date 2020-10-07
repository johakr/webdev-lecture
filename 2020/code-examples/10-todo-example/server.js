const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

let connection;

mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
  })
  .then((con) => {
    connection = con;
  });

app.use(express.static("public"));
app.use(express.json());

app.get("/todos", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM todos");

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
