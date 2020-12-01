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

    } catch (error) {
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
        let area;
        if (!isNaN(data.startPoint.longitude) && !isNaN(data.startPoint.latitude) && !isNaN(data.endPoint.longitude) && !isNaN(data.endPoint.latitude)) {
            area = await monitoredAreaService.createMonitoredArea(data);
        } else {
            throw Error("longitude and/or latitude are/is in the wrong type")
        }

        res.status(201).json({
            success: true,
            message: "create new monitored area successfully",
            content: area
        })

    } catch (error) {
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
        let area = await monitoredAreaService.getAreawithId(_id)

        res.status(200).json({
            success: true,
            message: "get monitored area by id successfully",
            content: area
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot get monitored area by id",
            content: error.message
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
            message: "delete monitored area by id successfully",
                    })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot delete area by id",
            content: error.message
        })
    }
}

exports.updateArea = async (req, res) => {
    try {
        let data = req.body;
        let _id = req.params._id
        console.log("Update area with id")
        const result = await monitoredAreaService.updateArea(_id, data);

        res.status(200).json({
            success: true,
            message: "Update area with id successfully",
            content: result
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot update area by id",
            content: error.message
        })
    }
}

exports.statisticFrequency = async (req, res) => {
    try {

        let freq = req.params.freq;
        let result = await monitoredAreaService.statisticFrequency(freq)

        res.status(200).json({
            success: true,
            message: "get area with frequency successfully",
            content: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot get area with frequency",
            content: error.message
        })
    }
}
exports.statisticLevel = async (req, res) => {
    try {

        let level = req.params.level;
        let result = await monitoredAreaService.statisticLevel(level)

        res.status(200).json({
            success: true,
            message: "get area with level successfully",
            content: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Cannot get area with level ",
            content: error.message
        })
    }
}