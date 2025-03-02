const express = require("express");
const axios = require("axios");
const restrurent = require("../controllers/restruent.crontroller");


const restaurantRoutes = express.Router();


restaurantRoutes.get("/", restrurent)
module.exports = restaurantRoutes;
