import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const NODE_PORT = 3000;
const AI_BASE_URL = "http://localhost:9000";

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/upload", upload.single("file"), async (req, res) => {

  try {

    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    const response = await fetch(`${AI_BASE_URL}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }

});

app.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const response = await fetch("http://localhost:9000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    res.json({
      reply: data.reply
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply: "Server error"
    });

  }

});
app.listen(NODE_PORT, () => {
  console.log("Backend running on port", NODE_PORT);
});