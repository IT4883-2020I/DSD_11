const express = require('express');
const router = express.Router();
const monitoredAreaController = require('./monitoredArea.controller');
const {auth} = require('../../middleware/index')

router.get('/', auth, monitoredAreaController.getAllMonitoredArea);
router.post('/', auth, monitoredAreaController.createNewArea)
router.get('/:_id', auth, monitoredAreaController.getAreabyId)
module.exports = router;