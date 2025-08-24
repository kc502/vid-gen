import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // allow browser requests

app.post("/api/generate-video", async (req, res) => {
  const { prompt, userApiKey } = req.body;

  if (!prompt || !userApiKey)
    return res.status(400).json({ error: "Prompt and API key required" });

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-preview:generateVideo?key=" +
        userApiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { text: prompt },
          config: { durationSeconds: 8 }
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Video generation failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Backend proxy server running");
});
