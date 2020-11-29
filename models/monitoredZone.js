const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitoredZoneSchema = new Schema({
    area: {
        type: Schema.Types.ObjectId,
        ref: 'MonitoredArea'
    },
    startPoint: {
        type: Object
    },
    endPoint: {
        type: Object
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
    },
    times: {
        type: Number
    },
    level: {
        type: Number
    }
}, {
    timestamps: true
})

const MonitoredZone = mongoose.model("MonitoredZone", monitoredZoneSchema) 

module.exports = MonitoredZone