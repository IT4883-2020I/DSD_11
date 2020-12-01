const { MonitoredArea } = require(SERVER_DIR + "/models");
const { MonitoredZone } = require(SERVER_DIR + "/models")

exports.getAllMonitoredArea = async (req, res) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);

    const limit = pageSize ? pageSize : 20;
    const offset = page ? page * limit : 0;
    let monitoredArea = await MonitoredArea.find({}).skip(offset).limit(limit)

    return { monitoredArea, page: page ? page : 0, pageSize: limit }
}

exports.createMonitoredArea = async (data) => {
    let area = await MonitoredArea.create({
        name: data.name,
        startPoint: data.startPoint,
        endPoint: data.endPoint,
        radius: data.radius,
        maxHeight: data.maxHeight,
        minHeight: data.minHeight,
        priority: data.priority,
    })
    
    return { area }
}

exports.getAreawithId = async (_id) => {
    let area = await MonitoredArea.findOne({ _id: _id });
    return { area }
}

exports.deleteAreawithId = async (_id) => {
    let area = await MonitoredArea.findByIdAndDelete({ _id: _id });
    let zone = await MonitoredZone.deleteMany({area: _id})
   
    return { area }
}

exports.updateArea = async (_id, data) => {
    console.log(data)
    await MonitoredArea.update({ _id: _id }, { $set: data });
    let area = await MonitoredArea.findById(_id)
    console.log(_id)

    return { area }
}

exports.statisticFrequency = async (freq) => {
    let data = await MonitoredArea.find({ times: freq });
    return { data }
}

exports.statisticLevel = async (level) => {
    let data;
    if (level == 0 || level == 1 || level == 2) {
        data = await MonitoredArea.find({ level: level });
    }
    else {
        data = "Donot have area in this level"
    }
    return { data }
}