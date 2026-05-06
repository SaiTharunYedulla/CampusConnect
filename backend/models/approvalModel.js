const pool = require("../config/db");

async function getPending() {
  const [rows] = await pool.query(
    "SELECT p.*, s.name, s.department FROM posts p JOIN students s ON p.student_id = s.id WHERE p.status = 'pending' ORDER BY p.created_at ASC",
  );
  return rows;
}

async function approvePost(postId, teacherId, score, suggestions) {
  await pool.query(
    "INSERT INTO approvals (post_id, teacher_id, score, suggestions, status) VALUES (?, ?, ?, ?, 'approved') ON DUPLICATE KEY UPDATE score = VALUES(score), suggestions = VALUES(suggestions), status = 'approved'",
    [postId, teacherId, score, suggestions],
  );
  await pool.query("UPDATE posts SET status = 'approved' WHERE id = ?", [
    postId,
  ]);
}

async function rejectPost(postId, teacherId, reason) {
  await pool.query(
    "INSERT INTO approvals (post_id, teacher_id, score, suggestions, status) VALUES (?, ?, 0, ?, 'rejected') ON DUPLICATE KEY UPDATE suggestions = VALUES(suggestions), status = 'rejected'",
    [postId, teacherId, reason],
  );
  await pool.query("UPDATE posts SET status = 'rejected' WHERE id = ?", [
    postId,
  ]);
}

async function requestRevision(postId, teacherId, message) {
  await pool.query(
    "INSERT INTO revisions (post_id, teacher_id, message) VALUES (?, ?, ?)",
    [postId, teacherId, message],
  );
  await pool.query("UPDATE posts SET status = 'revision' WHERE id = ?", [
    postId,
  ]);
}

async function getHistory(teacherId) {
  const [rows] = await pool.query(
    "SELECT a.*, p.title FROM approvals a JOIN posts p ON a.post_id = p.id WHERE a.teacher_id = ? ORDER BY a.updated_at DESC",
    [teacherId],
  );
  return rows;
}

module.exports = {
  getPending,
  approvePost,
  rejectPost,
  requestRevision,
  getHistory,
};
