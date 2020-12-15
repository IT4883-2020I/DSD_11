const { MonitoredZone } = require(SERVER_DIR + '/models');
const { MonitoredArea } = require(SERVER_DIR + "/models");
const { Incident } = require(SERVER_DIR + "/models")
const axios = require('axios')
var mongoose = require("mongoose")

exports.getZonebyArea = async (_id) => {

    let zone = await MonitoredZone.find({ area: _id });
    return { zone }
}

exports.getZonebyIncident = async (_id) => {

    let zone = await MonitoredZone.find({ incidentType: _id });
    return { zone }
}

exports.getAllZone = async (req) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);


    const limit = pageSize ? pageSize : 20;

    const offset = page ? page * limit : 0;

    let zone = await MonitoredZone.find({}).sort({ 'createdAt': -1, 'priority': -1 }).skip(offset).limit(limit);
    let size = await MonitoredZone.count({})

    return { zone: zone, page: page, pageSize: limit, totalPage: parseInt(size / limit) + 1, totalCount: size }
}

exports.getZonebyId = async (_id) => {
    let zone = await MonitoredZone.findById(_id);
    return { zone }
}

exports.createZone = async (data, areaid) => {

    let zone = await MonitoredZone.create({
        area: mongoose.Types.ObjectId(areaid),
        name: data.name ? data.name : "", //string
        code: data.code, //string
        minHeight: data.minHeight,
        maxHeight: data.maxHeight,
        startPoint: data.startPoint, //object longlat
        endPoint: data.endPoint, //object longlat
        priority: data.priority ? data.priority : 0,  //number
        itinerary: data.itinerary, //array 
        description: data.description ? data.description : "", //string
        active: data.active ? data.active : 1, //boolean
        incidentType: data.incidentType, //id
        times: data.times ? data.times : 0,
        level: data.level ? data.level : 0
    })

    let area = await MonitoredArea.findById(mongoose.Types.ObjectId(areaid));
    area.monitoredZone.push(zone);
    await area.save()

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
    await area.save();


    return { area }
}

exports.updateZone = async (_id, data) => {
    console.log(data)
    let zone = await MonitoredZone.findById(_id);
    let result

    if (zone) {
        await MonitoredZone.update({ _id: _id }, { $set: data });
        result = await MonitoredZone.findById(_id);
    } else {
        throw Error("Cannot find zone")
    }


    // if (data.drone) {
    //     let drone;
    //     for (var i = 0; i < data.drone.length; i++) {
    //         drone = await Drone.findById({ _id: data.drone[i]._id });
    //         if (drone) {
    //             drone.monitoredZone = zone;
    //             drone.save()
    //         }
    //     }
    // }

    return { result }
}
exports.statisticFrequency = async (token) => {
    let data = await MonitoredZone.find().sort({ 'times': -1 }).select(['code', 'name', 'times', 'incidentType']);
    let result = await MonitoredZone.find().lean().select(['code', 'name', 'times', 'incidentType']);
    let headers = {
        'token': token
    }
    for (let i = 0; i < data.length; i++) {
       console.log(data[1])
        if(data[1].incidentType){
        await axios.get("http://distributed.de-lalcool.com/api/projectType/" + data[1].incidentType, {headers})
        .then((response) => {
            //console.log(response)
            result[i].incident = response.data.result
        }).catch(error => {
            console.log(error)
        })}
    }

    return { result }
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

exports.addType = async () => {
    let zone = await MonitoredZone.find();
    let type = [1, 2, 3, 4];
    
    for (let i = 0; i < zone.length; i++) {
        let index = Math.floor(Math.random() * type.length)
        let incidentType = type[index]
        zone[i].incidentType = incidentType
        zone[i].save()
    }
    
    return { zone }
}

