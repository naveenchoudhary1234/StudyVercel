const express = require("express");
const router = express.Router();
const { generateAnswer } = require("../controllers/Voice");
const { auth } = require("../middlewares/auth");

router.post("/generate-answer", auth, generateAnswer);

module.exports = router;
