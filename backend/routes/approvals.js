const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/approvalController");

const router = express.Router();

router.get("/pending", auth("teacher"), controller.pending);
router.post("/:postId/approve", auth("teacher"), controller.approve);
router.post("/:postId/reject", auth("teacher"), controller.reject);
router.post("/:postId/revision", auth("teacher"), controller.revision);
router.get("/history", auth("teacher"), controller.history);

module.exports = router;
