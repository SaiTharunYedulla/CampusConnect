const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwtHelper");
const userModel = require("../models/userModel");

async function register(req, res) {
  const { email, password, role, ...profile } = req.body;
  const existing = await userModel.findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const userId = await userModel.createUser({ email, password: hashed, role });
  if (role === "student") {
    await userModel.createStudentProfile(userId, profile);
  } else if (role === "teacher") {
    await userModel.createTeacherProfile(userId, profile);
  }
  const token = signToken({ id: userId, role, email });
  return res.status(201).json({ token });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(user);
  return res.json({ token });
}

async function me(req, res) {
  const profile = await userModel.getUserProfile(req.user.id);
  return res.json(profile);
}

module.exports = { register, login, me };
