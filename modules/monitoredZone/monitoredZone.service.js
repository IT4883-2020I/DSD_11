const { MonitoredZone } = require(SERVER_DIR + '/models');
const { MonitoredArea } = require(SERVER_DIR + "/models");
const { Drone } = require(SERVER_DIR + "/models")
var mongoose = require("mongoose")

exports.getZonebyArea = async (_id) => {

    let zone = await MonitoredZone.find({ area: _id });
    return { zone }
}

exports.getAllZone = async (req) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);


    const limit = pageSize ? pageSize : 20;

    const offset = page ? page * limit : 0;

    let zone = await MonitoredZone.find({}).sort({'createdAt': -1,'priority':-1}).skip(offset).limit(limit);
    let size = await MonitoredZone.count({})

    return { zone: zone, page: page, pageSize: limit, totalPage: parseInt(size / limit) +1, totalCount: size }
}

exports.getZonebyId = async (_id) => {
    let zone = await MonitoredZone.findById(_id);
    return { zone }
}

exports.createZone = async (data, areaid) => {

    let zone = await MonitoredZone.create({
        area: mongoose.Types.ObjectId(areaid),
        name: data.name? data.name: "", //string
        code: data.code, //string
        startPoint: data.startPoint, //object longlat
        endPoint: data.endPoint, //object longlat
        priority: data.priority? data.priority:0,  //number
        itinerary: data.itinerary, //array 
        description: data.description? data.description : null, //string
        active: data.active? data.active: 1, //boolean
        incidentType: data.incidentType, //id
        times: data.times? data.times: 0,
        level: data.level? data.level :0
    })

    let area = await MonitoredArea.findById(mongoose.Types.ObjectId(areaid));
    area.monitoredZone.push(zone);
    area.save()

    // let drone;
    // if (data.drone) {
    //     for (var i = 0; i < data.drone.length; i++) {
    //         drone = await Drone.findById({ _id: data.drone[i]._id });
    //         console.log(drone)
    //         if (drone) {
    //             drone.monitoredZone = zone;
    //             drone.save()
    //         }
    //     }
    // }

    return { zone }
}

exports.deleteZone = async (_id) => {
    let zone = await MonitoredZone.findByIdAndDelete({ _id: _id });
    let area = await MonitoredArea.findOne({ monitoredZone: _id })

    let index = area.monitoredZone.indexOf(zone._id);
    if (index > -1) {
        area.monitoredZone.splice(index, 1)
    }
    area.save();


    return { area }
}

exports.updateZone = async (_id, data) => {
    console.log(data)
    await MonitoredZone.update({ _id: _id }, { $set: data });
    let zone = await MonitoredZone.findById(_id)


    if (data.drone) {
        let drone;
        for (var i = 0; i < data.drone.length; i++) {
            drone = await Drone.findById({ _id: data.drone[i]._id });
            if (drone) {
                drone.monitoredZone = zone;
                drone.save()
            }
        }
    }

    return { zone }
}
exports.statisticFrequency = async () => {
    let data = await MonitoredZone.find().sort({'times': -1});
    return { data }
}

exports.statisticLevel = async (level) => {
    let data;
    console.log(level)
    if (level == 0 || level == 1 || level == 2) {
        data = await MonitoredZone.find({ level: level });
    }
    else {
        data = "Donot have area in this level"
    }
    return { data }
}

