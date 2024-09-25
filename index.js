const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true } // Return the updated document
    );

    // Check if the entry was found
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Check if the redirectURL is valid
    if (!entry.redirectURL || !/^https?:\/\//.test(entry.redirectURL)) {
      return res.status(400).json({ error: "Invalid redirect URL" });
    }

    // Redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching the URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("Server Started on port", PORT));
