const approvalModel = require("../models/approvalModel");
const pool = require("../config/db");

async function getTeacherId(userId) {
  const [rows] = await pool.query("SELECT id FROM teachers WHERE user_id = ?", [
    userId,
  ]);
  if (!rows.length) {
    throw new Error("Teacher record not found");
  }
  return rows[0].id;
}

async function pending(req, res) {
  const rows = await approvalModel.getPending();
  return res.json(rows);
}

async function approve(req, res) {
  const { score, suggestions } = req.body;
  const teacherId = await getTeacherId(req.user.id);
  await approvalModel.approvePost(
    req.params.postId,
    teacherId,
    score,
    suggestions || "",
  );
  return res.json({ message: "Approved" });
}

async function reject(req, res) {
  const { reason, studentUserId } = req.body;
  const teacherId = await getTeacherId(req.user.id);
  await approvalModel.rejectPost(req.params.postId, teacherId, reason || "");
  return res.json({ message: "Rejected" });
}

async function revision(req, res) {
  const { message, studentUserId } = req.body;
  const teacherId = await getTeacherId(req.user.id);
  await approvalModel.requestRevision(
    req.params.postId,
    teacherId,
    message || "",
  );
  return res.json({ message: "Revision requested" });
}

async function history(req, res) {
  const teacherId = await getTeacherId(req.user.id);
  const rows = await approvalModel.getHistory(teacherId);
  return res.json(rows);
}

module.exports = { pending, approve, reject, revision, history };
