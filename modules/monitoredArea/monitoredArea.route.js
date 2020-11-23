const express = require('express');
const router = express.Router();
const monitoredAreaController = require('./monitoredArea.controller');
const {auth} = require('../../middleware/index')

router.get('/', auth, monitoredAreaController.getAllMonitoredArea);
router.post('/', auth, monitoredAreaController.createNewArea);
router.get('/:_id', auth, monitoredAreaController.getAreabyId);
router.put('/:_id', monitoredAreaController.updateArea);
router.delete('/:_id', auth, monitoredAreaController.deleteAreabyId)
module.exports = router;