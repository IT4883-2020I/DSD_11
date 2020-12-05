const { Drone } = require(SERVER_DIR + "/models");
const { MonitoredZone } = require(SERVER_DIR + "/models");

exports.setDronetoZone = async (data) => {
    let zone = await MonitoredZone.findById(data.zone);
    let droneData = data.drone;
    let drone;

    if(zone){
    for (var j = 0; j < droneData.length; j++) {
        drone = await Drone.findById(droneData[j]);
        console.log(droneData[j])
        var check=0;
        for (var i = 0; i < zone.drone.length; i++) {
            if (zone.drone[i].equals(drone._id)) {
                check = 1;
            }
        }
        if (check == 0) {
            zone.drone.push(drone);
        }
    }

    drone.save();
    zone.save();
} else {
    throw Error("Cannot find zone")
}

    return { zone: zone }

}

exports.deleteDronetoZone = async (_id) => {
    let drone = await Drone.findById(_id);
    let zone = await MonitoredZone.findById(drone.monitoredZone);

   
    let index = zone.drone.indexOf(drone._id);
    if (index > -1) {
        zone.drone.splice(index, 1)
    }
    zone.save();
    drone.save()

    return { zone: zone, drone: drone }

}

exports.getDronebyZone = async (_id) => {
    console.log(_id)
    let zone = await MonitoredZone.findById(_id)
    let drone = [];

    for (var i = 0; i < zone.drone.length; i++) {
        let element = await Drone.findById(zone.drone[i]);
        drone.push(element)
    }

    return { drone }
}