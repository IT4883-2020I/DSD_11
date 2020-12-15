const express = require('express');
const router = express.Router();
const incidentController = require("./incident.controller")

router.get("/:_id", incidentController.getIncidentById);
router.get("/", incidentController.getAllIncident)

module.exports = router