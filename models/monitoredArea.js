const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitoredAreaSchema = new Schema({
    name: {
        type: String
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
    maxHeight: {
        type: Number
    }, 
    minHeight: {
        type: Number
    },
    priority: {
        type: Number
    },
    monitoredZone: [{
        type: Schema.Types.ObjectId,
        ref: 'MonitoredZone'
    }],
    desciption: {
        type: String
    }
}, {
    timestamps: true
})

const MonitoredArea = mongoose.model("MonitoredArea", monitoredAreaSchema) 

module.exports = MonitoredArea