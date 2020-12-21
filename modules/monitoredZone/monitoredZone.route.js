const express = require("express");
const router = express.Router();
const monitoredZoneController = require("./monitoredZone.controller");
const {auth} = require("../../middleware/index");

router.get("/area/:_id", auth, monitoredZoneController.getZonebyArea);
router.get("/incident", monitoredZoneController.getZonebyIncident);
router.get("/",auth, monitoredZoneController.getAllZone);
router.get("/zoneinfo/:_id", auth, monitoredZoneController.getZonebyId);
router.post("/area",auth, monitoredZoneController.createZone);
router.delete("/:_id", auth, monitoredZoneController.deleteZone)
router.put("/:_id", monitoredZoneController.updateZone);
router.get('/statisticFrequency',  monitoredZoneController.statisticFrequency);
//router.get('/statisticLevel/:level',  monitoredZoneController.statisticLevel);
router.get('/addType', monitoredZoneController.addType)

module.exports = router