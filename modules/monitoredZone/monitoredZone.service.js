const { MonitoredZone } = require(SERVER_DIR + '/models');
const { MonitoredArea } = require(SERVER_DIR + "/models");

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
        area: areaid,
        longitude: data.longitude,
        latitude: data.latitude,
        radius: data.radius,
        priority: data.priority,
        drone: data.drone,
        desciption: data.desciption
    })
    let area = await MonitoredArea.findById(areaid);

    area.monitoredZone.push(zone);
    area.save()

    return { zone }
}

exports.deleteZone = async (_id) => {
    let zone = await MonitoredZone.findByIdAndDelete({ _id: _id });
    return { zone }
}

exports.updateZone = async (_id, data) => {
    await MonitoredZone.update({ _id: _id }, { $set: data });
    let zone = await MonitoredZone.findById(_id)

    return { zone }
}