const incidentSevice = require('./incident.service');

exports.getIncidentById = async (req, res) => {
    try {
        let _id = req.params._id;
        let result = await incidentSevice.getIncidentbyId(_id);
        res.status(200).json({
            success: true,
            message: "Get incident successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot get incident",
            content: error.message
        })
    }
}

exports.getAllIncident = async (req, res) => {
    try {
        let result = await incidentSevice.getAllIncident();
        res.status(200).json({
            success: true, 
            message: "Get all incident successfully",
            content: result
        })
        
    }catch(error) {
        res.status(400).json({
            success: false,
            message: "cannot get all incident",
            content: error.message
        })
    }
}
