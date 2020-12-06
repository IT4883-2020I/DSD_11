const express = require('express');
const router = express.Router();
const droneController = require("./drone.controller")

router.put("/", droneController.setDronetoZone);
router.get("/:_id", droneController.getDronebyZone);
router.put("/deleteDronefromZone", droneController.deleteDronebyZone)
router.put("/test/:_id", droneController.deleteDroneTest)

module.exports = router