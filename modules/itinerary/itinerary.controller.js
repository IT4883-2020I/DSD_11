const itineraryService = require('./itinerary.service');

exports.setItinerarytoZone = async (req, res) => {
    try {
        let data = req.body;
        let result = await itineraryService.setItinerarytoZone(data);
        res.status(200).json({
            success: true,
            message: "Set itinerary to zone successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot set itinerary to zone",
            content: error.message
        })
    }
}

exports.getItinerarybyZone = async (req, res) => {
    try {
        let _id = req.params._id;
        let result = await itineraryService.getItinerarybyZone(_id);
        res.status(200).json({
            success: true,
            message: "Get itinerary by zone successfully",
            content: result
        })
    } catch (error){
        res.status(400).json({
            success: false, 
            message: "Cannot get itinerary by zone",
            content: error.message
        })
    }
}

exports.deleteItinerarybyZone = async (req, res) => {
    try {
        const data = req.body
        let result = await itineraryService.deleteItinerarytoZone(data);
        res.status(200).json({
            success: true,
            message: "delete itinerary by zone successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot delete itinerary by zone",
            content: error.message
        })
    }
}

exports.deleteItineraryTest = async (req, res) => {
    try {
        var _id = req.params._id
        let result = await itineraryService.deleteItineraryTest(_id);
        res.status(200).json({
            success: true,
            message: "delete itinerary by zone successfully",
            content: result
        })

    }catch(error){
        res.status(400).json({
            success: false, 
            message: "Cannot delete itinerary by zone test",
            content: error.message
        })
    }
}