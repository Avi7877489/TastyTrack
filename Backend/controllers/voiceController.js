const OpenAI = require("openai");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require('dotenv')
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 🟢 Multer Setup for Audio Uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// 🟢 Convert Speech to Text using Whisper API
const transcribeAudio = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const audioPath = req.file.path;

        const response = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioPath),
            model: "whisper-1",
        });

        // Delete the uploaded file after processing
        fs.unlinkSync(audioPath);

        res.json({ transcript: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { transcribeAudio, upload };
