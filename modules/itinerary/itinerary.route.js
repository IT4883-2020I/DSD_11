const express = require('express');
const router = express.Router();
const itineraryController = require("./itinerary.controller")

//router.put("/", itineraryController.setItinerarytoZone);
router.get("/:_id", itineraryController.getItinerarybyZone);
router.put("/deleteitineraryfromZone", itineraryController.deleteItinerarybyZone)
router.put("/test/:_id", itineraryController.deleteItineraryTest)

module.exports = router