const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/postController");

const router = express.Router();

router.get("/feed", controller.feed);
router.get("/trending", controller.trending);
router.post(
  "/",
  auth("student"),
  upload.array("media", 6),
  controller.createPost,
);
router.get("/mine", auth("student"), controller.mine);
router.put("/:id", auth("student"), controller.update);
router.delete("/:id", auth("student"), controller.remove);
router.post("/:id/upvote", auth(), controller.upvote);

module.exports = router;
