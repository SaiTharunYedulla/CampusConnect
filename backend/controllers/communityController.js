const pool = require("../config/db");

async function list(req, res) {
  const [rows] = await pool.query("SELECT * FROM communities ORDER BY name");
  res.json(rows);
}

async function departmentPosts(req, res) {
  const [rows] = await pool.query(
    "SELECT p.*, s.name FROM posts p JOIN students s ON p.student_id = s.id WHERE s.department = ? AND p.status = 'approved' ORDER BY p.created_at DESC",
    [req.params.dept],
  );
  res.json(rows);
}

async function publicProfile(req, res) {
  const [rows] = await pool.query(
    "SELECT s.*, (SELECT COUNT(*) FROM posts p WHERE p.student_id = s.id AND p.status = 'approved') AS approved_posts FROM students s WHERE s.user_id = ?",
    [req.params.userId],
  );
  res.json(rows[0]);
}

module.exports = { list, departmentPosts, publicProfile };
