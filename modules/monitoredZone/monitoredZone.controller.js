const monitoredZoneService = require("./monitoredZone.service");

exports.getZonebyArea = async (req, res) => {
    try {
        console.log("Get zone by area id");
        let _id = req.params;
        const data = await monitoredZoneService.getZonebyArea(_id);
        console.log(data)
        res.status(200).json({
            success: true, 
            message: "Get zone by area id successfully",
            content: data
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: "Cannot get zone by area id",
            content: error.message
        })
    }
}
exports.getZonebyIncident = async (req, res) => {
    try {
        console.log("Get zone by area id");
        let _id = req.params;
        const data = await monitoredZoneService.getZonebyArea(_id);
        console.log(data)
        res.status(200).json({
            success: true, 
            message: "Get zone by area id successfully",
            content: data
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: "Cannot get zone by area id",
            content: error.message
        })
    }
}
exports.getAllZone = async (req, res) => {
    try {
        let data = await monitoredZoneService.getAllZone(req);
        res.status(200).json({
            success: true, 
            message: "Get all monitored zone successfully",
            content: data
        })

    }catch(error){
        res.status(400).json({
            success: false,
            message: "Cannot get all zone",
            content: error.message
        })
    }
}

exports.getZonebyId = async (req, res) => {
    try{
        let _id = req.params;
        let data = await monitoredZoneService.getZonebyId(_id);

        res.status(200).json({
            success: true, 
            message: "Get zone by id successfully",
            content: data
        })
    }catch(error) {
        res.status(400).json({
            success: false, 
            message: "Cannot get zone by id",
            content: error.message
        })
    }
}

exports.createZone = async (req, res) => {
    try {
        console.log("test")
        let _id = req.body._id
        let data = req.body.data;
        let result;
        if (!isNaN(data.startPoint.longitude) && !isNaN(data.startPoint.latitude) && !isNaN(data.endPoint.longitude) && !isNaN(data.endPoint.latitude)) {
         result = await monitoredZoneService.createZone(data, _id);
        } else {
            throw Error("longitude and/or latitude are/is in the wrong type")
        }
        res.status(201).json({
            success: true, 
            message: "Create zone successfully",
            content: result
        })
    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot create zone",
            content: error.message
        })
    }
}

exports.deleteZone = async (req, res) => {
    try{
        let data = req.params._id;
        let result = await monitoredZoneService.deleteZone(data);
        res.status(200).json({
            success: true, 
            message: "Delete zone successfully",
            content: result
        })
    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot delete zone",
            content: error.message
        })
    }
}

exports.updateZone = async (req, res) => {
    try {
        let data = req.body;
        let _id = req.params._id;
        let result = await monitoredZoneService.updateZone(_id, data);
        res.status(200).json({
            success: true, 
            message: "Update zone successfully",
            content: result
        })
    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot update zone",
            content: error.message
        })
    }
}
exports.statisticFrequency = async (req, res) => {
    try {

        let result = await monitoredZoneService.statisticFrequency(req.headers.token)

        res.status(200).json({
            success: true, 
            message: "get zone with frequency successfully",
            content: result
        })

    }catch (error){
        res.status(400).json({
            success: false, 
            message: "Cannot get zone with frequency",
            content: error.message
        })
    }
}
exports.statisticLevel = async (req, res) => {
    try {

        let level = req.params.level;
        let result = await monitoredZoneService.statisticLevel(level)

        res.status(200).json({
            success: true, 
            message: "get zone with level successfully",
            content: result
        })

    }catch (error){
        res.status(400).json({
            success: false, 
            message: "Cannot get zone with level ",
            content: error.message
        })
    }
}

exports.addType = async (req, res) => {
    try {

        let result = await monitoredZoneService.addType()

        res.status(200).json({
            success: true, 
            message: "add type successfully",
            content: result
        })

    }catch (error){
        res.status(400).json({
            success: false, 
            message: "Cannot add type",
            content: error.message
        })
    }
}