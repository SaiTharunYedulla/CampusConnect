const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/reportController");

const router = express.Router();

router.get("/pdf", auth("teacher"), controller.pdf);
router.get("/excel", auth("teacher"), controller.excel);

module.exports = router;
