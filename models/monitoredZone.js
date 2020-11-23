const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitoredZoneSchema = new Schema({
    area: {
        type: Schema.Types.ObjectId,
        ref: 'MonitoredArea'
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    radius: {
        type: Number
    },
    priority: {
        type: Number
    },
    drone: [{
        type: Schema.Types.ObjectId
    }],
    desciption: {
        type: String
    }
}, {
    timestamps: true
})

const MonitoredZone = mongoose.model("MonitoredZone", monitoredZoneSchema) 

module.exports = MonitoredZone