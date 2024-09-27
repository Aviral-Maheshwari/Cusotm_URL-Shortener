const URL = require("../models/url");

// Function to handle the creation of a new short URL
const handleGenerateNewShortURL = async (req, res) => {
  const { url } = req.body;

  if (!url || !/^https?:\/\//.test(url)) {
    console.log("Invalid URL received:", url);
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = Math.random().toString(36).substring(2, 8);

  try {
    const newUrl = await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
    });

    console.log("New shortened URL created:", newUrl); // Log the new entry
    return res.json({ id: shortId });
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleGenerateNewShortURL,
};
