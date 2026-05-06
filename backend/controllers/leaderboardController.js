const pool = require("../config/db");

async function global(req, res) {
  const [rows] = await pool.query(
    "SELECT s.name, s.roll_number, s.department, s.year, SUM(a.score) AS total_score, COUNT(a.id) AS approved_posts FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' GROUP BY s.id ORDER BY total_score DESC",
  );
  res.json(rows);
}

async function monthly(req, res) {
  const [rows] = await pool.query(
    "SELECT s.name, s.department, SUM(a.score) AS total_score FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' AND MONTH(a.updated_at) = MONTH(CURRENT_DATE()) GROUP BY s.id ORDER BY total_score DESC",
  );
  res.json(rows);
}

async function department(req, res) {
  const [rows] = await pool.query(
    "SELECT s.name, s.roll_number, s.department, SUM(a.score) AS total_score FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' AND s.department = ? GROUP BY s.id ORDER BY total_score DESC",
    [req.params.dept],
  );
  res.json(rows);
}

async function top(req, res) {
  const limit = Number(req.params.n || 10);
  const [rows] = await pool.query(
    "SELECT s.name, s.roll_number, s.department, s.year, SUM(a.score) AS total_score FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' GROUP BY s.id ORDER BY total_score DESC LIMIT ?",
    [limit],
  );
  res.json(rows);
}

module.exports = { global, monthly, department, top };
