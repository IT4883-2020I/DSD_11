const express = require("express");
const router = express.Router();
const monitoredZoneController = require("./monitoredZone.controller");
const {auth} = require("../../middleware/index");

router.get("/area/:_id", monitoredZoneController.getZonebyArea);
router.get("/", monitoredZoneController.getAllZone);
router.get("/:_id", monitoredZoneController.getZonebyId);
router.post("/area/:_id", monitoredZoneController.createZone);
router.delete("/:_id", monitoredZoneController.deleteZone)
router.put("/:_id", monitoredZoneController.updateZone)

module.exports = router