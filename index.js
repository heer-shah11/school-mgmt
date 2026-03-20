
console.log("INDEX FILE LOADED");


const cors = require("cors");
const express = require("express");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM students");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/students", async (req, res) => {
  const { name, age } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO students (name, age) VALUES (?, ?)",
      [name, age]
    );
    conn.release();
    res.json({ message: "Student added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/students/:id", async (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "UPDATE students SET name=?, age=? WHERE id=?",
      [name, age, id]
    );
    conn.release();
    res.json({ message: "Student updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM students WHERE id=?", [id]);
    conn.release();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/teachers", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM teacher");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/teachers", async (req, res) => {
  const { name } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO teacher (name) VALUES (?)",
      [name]
    );
    conn.release();
    res.json({ message: "Teacher added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "UPDATE teacher SET name=? WHERE id=?",
      [name, id]
    );
    conn.release();
    res.json({ message: "Teacher updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM teacher WHERE id=?", [id]);
    conn.release();
    res.json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/subjects", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM subject");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/subjects", async (req, res) => {
  const { name } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO subject (name) VALUES (?)",
      [name]
    );
    conn.release();
    res.json({ message: "Subject added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/subjects/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "UPDATE subject SET name=? WHERE id=?",
      [name, id]
    );
    conn.release();
    res.json({ message: "Subject updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/subjects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM subject WHERE id=?", [id]);
    conn.release();
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/attendance", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM attendance");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/attendance", async (req, res) => {
  const { student_id, subject_id, status } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "INSERT INTO attendance (student_id, subject_id, status) VALUES (?, ?, ?)",
      [student_id, subject_id, status]
    );
    conn.release();
    res.json({ message: "Attendance added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put("/attendance/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query(
      "UPDATE attendance SET status=? WHERE id=?",
      [status, id]
    );
    conn.release();
    res.json({ message: "Attendance updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/attendance/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await pool.getConnection();
    await conn.query("DELETE FROM attendance WHERE id=?", [id]);
    conn.release();
    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});