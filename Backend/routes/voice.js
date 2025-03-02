const express = require("express");
const { transcribeAudio, upload } = require("../controllers/voiceController");
const { textToSpeech } = require("../controllers/ttsController");

const voicerouter = express.Router();

voicerouter.post("/speech-to-text", upload.single("audio"), transcribeAudio);
voicerouter.post("/text-to-speech", textToSpeech);

module.exports = voicerouter;
