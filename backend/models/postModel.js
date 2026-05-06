const pool = require("../config/db");

async function createPost(data) {
  const [result] = await pool.query(
    "INSERT INTO posts (student_id, title, description, hashtags, category, status) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.student_id,
      data.title,
      data.description,
      data.hashtags || "",
      data.category || "",
      "pending",
    ],
  );
  return result.insertId;
}

async function addMedia(postId, media) {
  const [result] = await pool.query(
    "INSERT INTO post_media (post_id, url, type) VALUES (?, ?, ?)",
    [postId, media.url, media.type],
  );
  return result.insertId;
}

async function getFeed(limit, offset) {
  const [rows] = await pool.query(
    "SELECT p.*, s.name, s.department, a.score, a.suggestions FROM posts p JOIN students s ON p.student_id = s.id LEFT JOIN approvals a ON p.id = a.post_id WHERE p.status = 'approved' ORDER BY p.created_at DESC LIMIT ? OFFSET ?",
    [limit, offset],
  );
  return rows;
}

async function getPostMedia(postId) {
  const [rows] = await pool.query(
    "SELECT * FROM post_media WHERE post_id = ?",
    [postId],
  );
  return rows;
}

async function getStudentPosts(studentId) {
  const [rows] = await pool.query(
    "SELECT p.*, a.score, a.status as approval_status FROM posts p LEFT JOIN approvals a ON p.id = a.post_id WHERE p.student_id = ? ORDER BY p.created_at DESC",
    [studentId],
  );
  return rows;
}

async function updatePost(postId, data) {
  await pool.query(
    "UPDATE posts SET title = ?, description = ?, hashtags = ?, category = ?, status = 'pending' WHERE id = ?",
    [
      data.title,
      data.description,
      data.hashtags || "",
      data.category || "",
      postId,
    ],
  );
}

async function deletePost(postId) {
  await pool.query("DELETE FROM posts WHERE id = ?", [postId]);
}

async function toggleUpvote(postId, userId) {
  const [rows] = await pool.query(
    "SELECT id FROM upvotes WHERE post_id = ? AND user_id = ?",
    [postId, userId],
  );
  if (rows.length) {
    await pool.query("DELETE FROM upvotes WHERE id = ?", [rows[0].id]);
    return "removed";
  }
  await pool.query("INSERT INTO upvotes (post_id, user_id) VALUES (?, ?)", [
    postId,
    userId,
  ]);
  return "added";
}

async function getTrending(limit) {
  const [rows] = await pool.query(
    "SELECT p.*, COUNT(u.id) as upvotes FROM posts p LEFT JOIN upvotes u ON p.id = u.post_id WHERE p.status = 'approved' GROUP BY p.id ORDER BY upvotes DESC, p.created_at DESC LIMIT ?",
    [limit],
  );
  return rows;
}

module.exports = {
  createPost,
  addMedia,
  getFeed,
  getPostMedia,
  getStudentPosts,
  updatePost,
  deletePost,
  toggleUpvote,
  getTrending,
};
