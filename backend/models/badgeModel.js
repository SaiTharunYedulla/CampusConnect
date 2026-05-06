const pool = require("../config/db");

async function listBadges() {
  const [rows] = await pool.query(
    "SELECT * FROM badges ORDER BY points_required ASC",
  );
  return rows;
}

async function awardBadge(studentId, badgeId) {
  await pool.query(
    "INSERT IGNORE INTO student_badges (student_id, badge_id) VALUES (?, ?)",
    [studentId, badgeId],
  );
}

module.exports = { listBadges, awardBadge };
