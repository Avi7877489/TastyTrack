const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const locationroutes = express.Router();

locationroutes.get('/', async (req, res) => {
    try {
        const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
       
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7749,-122.4194&radius=1500&key=${GOOGLE_API_KEY}`;

        const response = await axios.get(url);
        const location = response.data.results.slice(0, 5).map((place) => ({
            name: place.name, 
            address: place.vicinity, 
        }));

        res.json(location);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location data" });
    }
});

module.exports = locationroutes;
