const express = require('express');
const router = express.Router();
const monitoredAreaController = require('./monitoredArea.controller');
const {auth} = require('../../middleware/index')

router.get('/', monitoredAreaController.getAllMonitoredArea);
router.post('/', auth,  monitoredAreaController.createNewArea);
router.get('/areainfo/:_id',  monitoredAreaController.getAreabyId);
router.put('/:_id', auth, monitoredAreaController.updateArea);
router.delete('/:_id', auth,  monitoredAreaController.deleteAreabyId);
router.get('/statisticFrequency',  monitoredAreaController.statisticFrequency);
//router.get('/statisticLevel/:level',  monitoredAreaController.statisticLevel);
module.exports = router;