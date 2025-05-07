const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Avinash@83083",
  database: "students_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Routes
app.post("/students", (req, res) => {
  const { name, age, grade } = req.body;
  const sql = "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)";
  db.query(sql, [name, age, grade], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Student added", id: result.insertId });
  });
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
