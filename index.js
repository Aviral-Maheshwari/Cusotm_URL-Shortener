const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: "http://127.0.0.1:5500", // Allow requests from this origin
  methods: ["GET", "POST"], // Allow only specific methods
};

app.use(cors(corsOptions)); // Enable CORS with specified options

app.use(express.json());

// Connect to MongoDB
connectToMongoDB(
  "mongodb+srv://techaviral:dohF7Qq0QPqHJr9L@techaviral0.i812k.mongodb.net/?retryWrites=true&w=majority&appName=techaviral0"
).then(() => console.log("MongoDB Connected"));

// Use the URL routes
app.use("/url", urlRoute);
app.use(cors()); // Enable CORS in index.js

// Handle short URL redirects
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (!entry.redirectURL || !/^https?:\/\//.test(entry.redirectURL)) {
      return res.status(400).json({ error: "Invalid redirect URL" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching the URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
