const express = require('express');
const router = express.Router();
const monitoredAreaController = require('./monitoredArea.controller');

router.get('/', monitoredAreaController.getAllMonitoredArea);
router.post('/', monitoredAreaController.createNewArea)
router.get('/:_id', monitoredAreaController.getAreabyId)
module.exports = router;