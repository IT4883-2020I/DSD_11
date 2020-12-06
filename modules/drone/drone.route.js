const express = require('express');
const router = express.Router();
const droneController = require("./drone.controller")

router.put("/", droneController.setDronetoZone);
router.get("/:_id", droneController.getDronebyZone);
//router.put("/:_id", droneController.deleteDronebyZone)
router.put("/test", droneController.deleteDroneTest)

module.exports = router