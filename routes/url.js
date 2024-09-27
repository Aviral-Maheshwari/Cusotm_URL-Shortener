const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");

const router = express.Router();

// Handle POST request to generate new short URL
router.post("/", handleGenerateNewShortURL);

module.exports = router;
