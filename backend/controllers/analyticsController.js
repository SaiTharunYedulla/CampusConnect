const pool = require("../config/db");

async function overview(req, res) {
  const [[totals]] = await pool.query(
    "SELECT (SELECT COUNT(*) FROM posts) AS total_posts, (SELECT COUNT(*) FROM posts WHERE status = 'pending') AS pending_posts, (SELECT COUNT(*) FROM posts WHERE status = 'approved') AS approved_posts, (SELECT AVG(score) FROM approvals WHERE status = 'approved') AS avg_score",
  );
  res.json(totals);
}

async function departmentPerformance(req, res) {
  const [rows] = await pool.query(
    "SELECT s.department, AVG(a.score) AS avg_score, COUNT(a.id) AS approvals FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' GROUP BY s.department",
  );
  res.json(rows);
}

async function monthlyActivity(req, res) {
  const [rows] = await pool.query(
    "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS count FROM posts GROUP BY month ORDER BY month",
  );
  res.json(rows);
}

async function topStudents(req, res) {
  const [rows] = await pool.query(
    "SELECT s.name, s.department, SUM(a.score) AS total_score FROM students s JOIN posts p ON s.id = p.student_id JOIN approvals a ON p.id = a.post_id WHERE a.status = 'approved' GROUP BY s.id ORDER BY total_score DESC LIMIT 5",
  );
  res.json(rows);
}

module.exports = {
  overview,
  departmentPerformance,
  monthlyActivity,
  topStudents,
};
