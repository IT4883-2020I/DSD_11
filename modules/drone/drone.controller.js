const droneService = require('./drone.service');

exports.setDronetoZone = async (req, res) => {
    try {

        let data = req.body;
        let result = await droneService.setDronetoZone(data);
        res.status(200).json({
            success: true,
            message: "Set drone to zone successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot set drone to zone",
            content: error.message
        })
    }
}

exports.getDronebyZone = async (req, res) => {
    try {
        let _id = req.params._id;
        let result = await droneService.getDronebyZone(_id);
        res.status(200).json({
            success: true,
            message: "Get drone by zone successfully",
            content: result
        })
    } catch (error){
        res.status(400).json({
            success: false, 
            message: "Cannot get drone by zone",
            content: error.message
        })
    }
}

exports.deleteDronebyZone = async (req, res) => {
    try {
        let _id = req.params._id;
        let result = await droneService.deleteDronetoZone(_id);
        res.status(200).json({
            success: true,
            message: "delete drone by zone successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot delete drone by zone",
            content: error.message
        })
    }
}