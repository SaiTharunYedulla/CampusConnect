const pool = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

async function createUser({ email, password, role }) {
  const [result] = await pool.query(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, password, role],
  );
  return result.insertId;
}

async function createStudentProfile(userId, data) {
  const [result] = await pool.query(
    "INSERT INTO students (user_id, name, roll_number, department, year, skills, bio, profile_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      data.name,
      data.roll_number,
      data.department,
      data.year,
      data.skills || "",
      data.bio || "",
      data.profile_photo || "",
    ],
  );
  return result.insertId;
}

async function createTeacherProfile(userId, data) {
  const [result] = await pool.query(
    "INSERT INTO teachers (user_id, name, department, designation) VALUES (?, ?, ?, ?)",
    [userId, data.name, data.department, data.designation || ""],
  );
  return result.insertId;
}

async function getUserProfile(userId) {
  const [rows] = await pool.query(
    "SELECT u.id, u.email, u.role, s.name, s.roll_number, s.department, s.year, s.skills, s.bio, s.profile_photo FROM users u LEFT JOIN students s ON u.id = s.user_id WHERE u.id = ?",
    [userId],
  );
  return rows[0];
}

module.exports = {
  findUserByEmail,
  createUser,
  createStudentProfile,
  createTeacherProfile,
  getUserProfile,
};
