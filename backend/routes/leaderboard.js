const express = require("express");
const controller = require("../controllers/leaderboardController");

const router = express.Router();

router.get("/", controller.global);
router.get("/monthly", controller.monthly);
router.get("/department/:dept", controller.department);
router.get("/top/:n", controller.top);

module.exports = router;
