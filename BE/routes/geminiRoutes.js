const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/geminiController");

router.post("/gemini/chat", handleChat);

module.exports = router;
