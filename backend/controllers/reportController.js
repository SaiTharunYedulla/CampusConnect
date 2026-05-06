const pool = require("../config/db");
const { generatePdf, generateExcel } = require("../utils/reportGenerator");

async function getLeaderboardRows(top, dept) {
  const params = [];
  let where = "";
  if (dept) {
    where = "AND s.department = ?";
    params.push(dept);
  }
  params.push(top);
  const [rows] = await pool.query(
    `SELECT s.name, s.roll_number, s.department, s.year, SUM(a.score) AS total_score, COUNT(sb.id) AS badge_count
     FROM students s
     JOIN posts p ON s.id = p.student_id
     JOIN approvals a ON p.id = a.post_id
     LEFT JOIN student_badges sb ON s.id = sb.student_id
     WHERE a.status = 'approved' ${where}
     GROUP BY s.id
     ORDER BY total_score DESC
     LIMIT ?`,
    params,
  );
  return rows;
}

async function pdf(req, res) {
  const top = Number(req.query.top || 10);
  const dept = req.query.dept;
  const rows = await getLeaderboardRows(top, dept);
  await generatePdf(res, rows);
}

async function excel(req, res) {
  const top = Number(req.query.top || 10);
  const dept = req.query.dept;
  const rows = await getLeaderboardRows(top, dept);
  await generateExcel(res, rows);
}

module.exports = { pdf, excel };
