const express = require('express');
const router = express.Router();
const incidentController = require("./incident.controller")

router.get("/:_id", incidentController.getIncidentById);

module.exports = router