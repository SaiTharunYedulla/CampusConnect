const express = require("express");
const controller = require("../controllers/communityController");

const router = express.Router();

router.get("/", controller.list);
router.get("/:dept/posts", controller.departmentPosts);
router.get("/profile/:userId", controller.publicProfile);

module.exports = router;
