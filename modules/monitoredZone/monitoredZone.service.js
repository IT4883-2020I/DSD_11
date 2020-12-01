const { MonitoredZone } = require(SERVER_DIR + '/models');
const { MonitoredArea } = require(SERVER_DIR + "/models");
const { Drone } = require(SERVER_DIR + "/models")
var mongoose = require("mongoose")

exports.getZonebyArea = async (_id) => {

    let zone = await MonitoredZone.findOne({ area: _id });
    console.log(zone)
    return { zone }
}

exports.getAllZone = async (req) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const limit = pageSize ? pageSize : 20;
    const offset = page ? page * limit : 0;
    let zone = await MonitoredZone.find({}).sort('priority').skip(offset).limit(limit);

    return { zone: zone, page: page, pageSize: limit }
}

exports.getZonebyId = async (_id) => {
    let zone = await MonitoredZone.findById(_id);
    return { zone }
}

exports.createZone = async (data, areaid) => {

    let zone = await MonitoredZone.create({
        area: mongoose.Types.ObjectId(areaid),
        startPoint: data.startPoint,
        endPoint: data.endPoint,
        radius: data.radius,
        priority: data.priority,
        drone: data.drone,
        desciption: data.desciption
    })
    let area = await MonitoredArea.findById(mongoose.Types.ObjectId(areaid));
    area.monitoredZone.push(zone);
    area.save()

    let drone;
    console.log(data.drone.length)
    for (var i = 0; i < data.drone.length; i++) {
        drone = await Drone.findById({ _id: data.drone[i]._id });
        drone.monitoredZone = zone;
        drone.save()
    }

    return { zone }
}

exports.deleteZone = async (_id) => {
    let zone = await MonitoredZone.findByIdAndDelete({ _id: _id });


    return { zone }
}

exports.updateZone = async (_id, data) => {
    console.log(data)
    await MonitoredZone.update({ _id: _id }, { $set: data });
    let zone = await MonitoredZone.findById(_id)

    
    if (data.drone) {
        let drone;
        for (var i = 0; i < data.drone.length; i++) {
            drone = await Drone.findById({ _id: data.drone[i]._id });
            drone.monitoredZone = zone;
            drone.save()
        }
    }

    return { zone }
}
exports.statisticFrequency = async (freq) => {
    let data = await MonitoredZone.find({ times: freq });
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

