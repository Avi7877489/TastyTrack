const googleTTS = require("google-tts-api");


const textToSpeech = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text is required" });

        // Generate TTS URL
        const url = googleTTS.getAudioUrl(text, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
        });

        res.json({ audioUrl: url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { textToSpeech };
