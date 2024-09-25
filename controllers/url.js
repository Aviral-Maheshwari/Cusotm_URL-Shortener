const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let originalURL = body.url;

  // Check if the URL has a protocol, if not, add "http://"
  if (!/^https?:\/\//i.test(originalURL)) {
    originalURL = "http://" + originalURL;
  }

  const shortID = shortid();
  try {
    await URL.create({
      shortId: shortID,
      redirectURL: originalURL,
      visitHistory: [],
    });

    return res.json({ id: shortID });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
