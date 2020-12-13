const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitoredZoneSchema = new Schema({
    area: {
        type: Schema.Types.ObjectId,
        ref: 'MonitoredArea',
        required: true
    },
    name: {
        type: String, 
    },
    code: {
        type: String,
        required: true
    },
    maxHeight: {
        type: Number, 
        required: true
    },
    minHeight: {
        type: Number,
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
        }
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
    priority: {
        type: Number
    },
    itinerary: [{
        type: Object
    }],
    description: {
        type: String
    },
    times: {
        type: Number
    },
    level: {
        type: Number
    },
    active: {
        type: Boolean
    },
    incidentType: {
        type: mongoose.Types.ObjectId,
        ref: 'Incident',
        required: true
    }
}, {
    timestamps: true
})

const MonitoredZone = mongoose.model("MonitoredZone", monitoredZoneSchema) 

module.exports = MonitoredZone