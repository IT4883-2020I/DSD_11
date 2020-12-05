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
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    startPoint: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
    },
    endPoint: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    maxHeight: {
        type: Number,
        required: true
    }, 
    minHeight: {
        type: Number,
        required: true
    },
    priority: {
        type: Number
    },
    monitoredZone: [{
        type: Schema.Types.ObjectId,
        ref: 'MonitoredZone'
    }],
    description: {
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