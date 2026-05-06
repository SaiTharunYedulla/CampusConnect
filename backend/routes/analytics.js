const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/analyticsController");

const router = express.Router();

router.get("/overview", auth("teacher"), controller.overview);
router.get(
  "/department-performance",
  auth("teacher"),
  controller.departmentPerformance,
);
router.get("/monthly-activity", auth("teacher"), controller.monthlyActivity);
router.get("/top-students", auth("teacher"), controller.topStudents);

module.exports = router;
