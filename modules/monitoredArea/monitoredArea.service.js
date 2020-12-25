const { MonitoredArea } = require(SERVER_DIR + "/models");
const { MonitoredZone } = require(SERVER_DIR + "/models")

exports.getAllMonitoredArea = async (query) => {
    const page = Number(query.page);
    const pageSize = Number(query.pageSize);

    const limit = pageSize ? pageSize : 20;
    const offset = page ? page * limit : 0;

    let monitoredArea = await MonitoredArea.find({}).sort({ 'createdAt': -1 }).skip(offset).limit(limit)
    let size = await MonitoredArea.count({})

    return { monitoredArea, page: page ? page : 0, pageSize: limit, totalPage: parseInt(size / limit) + 1, totalCount: size }
}

exports.createMonitoredArea = async (data) => {
    let area;
    let checkadmin = global.user.role === 'ADMIN';
    let checksuperadmin = global.user.role === 'SUPER_ADMIN';

    if (checkadmin || checksuperadmin) {
        area = await MonitoredArea.create({
            name: data.name,
            code: data.code,
            startPoint: data.startPoint,
            endPoint: data.endPoint,
            maxHeight: data.maxHeight,
            minHeight: data.minHeight,
            priority: data.priority ? data.priority : 0,
            level: data.level ? data.level : 0,
            times: data.times ? data.times : 0,
            description: data.description ? data.description : ""
        })
    } else {
        throw Error("Ban khong co quyen tao khu vuc giam sat, vui long dang nhap voi vai tro admin hoac superadmin")
    }
    // name
    // code
    // startPoint
    // endPoint
    // maxHeight 
    // minHeight
    // priority
    // monitoredZone
    // description
    // level
    // times
    return { area }
}

exports.getAreawithId = async (_id) => {
    let area = await MonitoredArea.findOne({ _id: _id });
    return { area }
}

exports.deleteAreawithId = async (_id) => {
    let area;
    let zone;
    let findarea = await MonitoredArea.findById(_id)
    let checksuperadmin = global.user.role === "SUPER_ADMIN"
    if (checksuperadmin) {
        if (findarea) {
            area = await MonitoredArea.findByIdAndDelete({ _id: _id });
            zone = await MonitoredZone.deleteMany({ area: _id })
        } else {
            throw Error("Khong ton tai area")
        }
    } else {
        throw Error("Ban khong co quyen xoa khu vuc giam sat, vui long dang nhap voi vai tro superadmin")
    }
    return { area }
}

exports.updateArea = async (_id, data) => {
    console.log(data)
    let area = await MonitoredArea.findById(_id)
    let result;
    let checksuperadmin = global.user.role === "SUPER_ADMIN"
    if (checksuperadmin) {
        if (area) {
            await MonitoredArea.update({ _id: _id }, { $set: data });
            result = await MonitoredArea.findById(_id)
        } else {
            throw Error("Cannot find area")
        }
    } else {
        throw Error("Ban khong co quyen cap nhat khu vuc giam sat, vui long dang nhap voi vai tro superadmin")
    }
    return { result }
}

exports.statisticFrequency = async () => {
    let data = await MonitoredArea.find().sort({ 'times': -1 }).select(['code', 'name', 'times']);
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