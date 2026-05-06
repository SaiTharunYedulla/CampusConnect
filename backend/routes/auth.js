const express = require("express");
const auth = require("../middleware/auth");
const { requireFields } = require("../middleware/validate");
const controller = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  requireFields(["email", "password", "role"]),
  controller.register,
);
router.post("/login", requireFields(["email", "password"]), controller.login);
router.get("/me", auth(), controller.me);

module.exports = router;
