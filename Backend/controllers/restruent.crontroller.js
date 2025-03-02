const dotenv = require('dotenv')
dotenv.config()

const restrurent = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ error: "Latitude and longitude are required." });
        }

        const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=restaurant&key=${GOOGLE_API_KEY}`;

        const response = await axios.get(url);
        const restaurants = response.data.results.slice(0, 5).map((place) => ({
            name: place.name,
            rating: place.rating || "No rating",
            address: place.vicinity,
        }));

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Error fetching restaurant data" });
    }
}

module.exports = restrurent
