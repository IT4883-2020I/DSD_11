const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incidentSchema = new Schema ({
    _id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident