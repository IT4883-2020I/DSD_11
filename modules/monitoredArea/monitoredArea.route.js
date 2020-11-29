const express = require('express');
const router = express.Router();
const monitoredAreaController = require('./monitoredArea.controller');
const {auth} = require('../../middleware/index')

router.get('/',  monitoredAreaController.getAllMonitoredArea);
router.post('/',  monitoredAreaController.createNewArea);
router.get('/:_id',  monitoredAreaController.getAreabyId);
router.put('/:_id', monitoredAreaController.updateArea);
router.delete('/:_id',  monitoredAreaController.deleteAreabyId);
router.get('/statisticFrequency/:freq',  monitoredAreaController.statisticFrequency);
router.get('/statisticLevel/:level',  monitoredAreaController.statisticLevel);
module.exports = router;