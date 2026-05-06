const pool = require("../config/db");

async function search(req, res) {
  const q = `%${req.query.q || ""}%`;
  const type = req.query.type || "all";

  const results = {};
  if (type === "all" || type === "students") {
    const [rows] = await pool.query(
      "SELECT id, name, roll_number, department FROM students WHERE name LIKE ? OR roll_number LIKE ?",
      [q, q],
    );
    results.students = rows;
  }
  if (type === "all" || type === "posts") {
    const [rows] = await pool.query(
      "SELECT id, title, description, hashtags FROM posts WHERE status = 'approved' AND (title LIKE ? OR description LIKE ? OR hashtags LIKE ?)",
      [q, q, q],
    );
    results.posts = rows;
  }
  if (type === "all" || type === "departments") {
    const [rows] = await pool.query(
      "SELECT DISTINCT department FROM students WHERE department LIKE ?",
      [q],
    );
    results.departments = rows;
  }

  res.json(results);
}

module.exports = { search };
