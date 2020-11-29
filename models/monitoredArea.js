const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitoredAreaSchema = new Schema({
    manager: {
        type: Schema.Types.ObjectId
    },
    supervisor: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
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
    }, 
    level: {
        type: Number
    },
    times: {
        type: Number
    }
}, {
    timestamps: true
})

const MonitoredArea = mongoose.model("MonitoredArea", monitoredAreaSchema) 

module.exports = MonitoredArea