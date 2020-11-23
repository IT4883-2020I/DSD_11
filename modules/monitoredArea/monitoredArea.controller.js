const monitoredAreaService = require('./monitoredArea.service');

exports.getAllMonitoredArea = async (req, res) => {
    try {
       
        console.log("get all monitored area");
        let data = await monitoredAreaService.getAllMonitoredArea(req, res);

        res.status(200).json({
            success: true, 
            message: "get all monitored area successfully",
            content: data
        })

    } catch (error){
        res.status(400).json({
            success: false, 
            message: "get all monitored area failed",
            content: error.message
        })
    }
}

exports.createNewArea = async (req, res) => {
    try {
        console.log("Create new monitored area");
        let data = req.body;
        let area = await monitoredAreaService.createMonitoredArea(data);

        res.status(201).json({
            success: true, 
            message: "create new monitored area successfully",
            content: area
        })

    }catch (error) {
        res.status(400).json({
            success: false, 
            message: "Cannot create new monitored area",
            content: error.message
        })
    }
}

exports.getAreabyId = async (req, res) => {
    try {
        console.log("Get monitored area by id");
        let _id = req.params._id;
        let area  = await monitoredAreaService.getAreawithId(_id)

        res.status(200).json({
            success: true, 
            message: "get monitored area by id successfully",
            content: area
        })
    }catch(error) {
        res.status(400).json({
            success: false, 
            message: "Cannot get monitored area by id",
        })
    }
}

exports.deleteAreabyId = async (req, res) => {
    try {
        console.log("Delete monitored area by id");
        let _id = req.params._id;
        await monitoredAreaService.deleteAreawithId(_id);
        
        res.status(200).json({
            success: true, 
            message: "delete monitored area by id successfully"
        })
    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot delete area by id"
        })
    }
}

exports.updateArea = async (req, res) => {
    try {
        let data = req.body;
        let _id= req.params._id
        console.log("Update area with id")
        const result = await monitoredAreaService.updateArea(_id, data);

        res.status(200).json({
            success: true, 
            message: "Update area with id successfully",
            content: result
        })


    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot update area by id"
        })
    }
}