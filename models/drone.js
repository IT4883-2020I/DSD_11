const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const droneSchema = new Schema({
   isUsed: {
       type: Boolean
   },
   idLog: {
       type: Number
   },
   flightTime: {
       type: Number
   },
   brand: {
       type: String
   },
   color: {
       type: String
   },
   dimensions: {
       type: String
   },
   weight: {
       type: Number
   },
   photography: {
       type: String
   },
   videoCapture: {
       type: String
   },
   maxSpeed: {
       type: Number
   },
   maxFlightTime: {
       type: Number
   },
}, {
    timestamps: true
})

const Drone = mongoose.model('Drone', droneSchema);
module.exports = Drone