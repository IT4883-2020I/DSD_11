const { Drone } = require(SERVER_DIR + "/models");
const { MonitoredZone } = require(SERVER_DIR + "/models");
const axios = require('axios')

exports.setDronetoZone = async (data) => {
    let zone = await MonitoredZone.findById(data.zone);
    let droneData = data.drone;
    let drone;

    if (zone) {
        for (var j = 0; j < droneData.length; j++) {
            //drone = await Drone.findById(droneData[j]);

            await axios.get("http://skyrone.cf:6789/drone/getById/" + droneData[j])
                .then((response) => {
                    drone = response.data
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })


            //console.log(droneData[j])
            console.log(drone)
            if(drone){
            zone.drone.push(drone);
            }else {
                throw Error("drone is null, check again")
            }
        }

        await zone.save();
    } else {
        throw Error("Cannot find zone")
    }

    return { zone: zone }

}

exports.deleteDronetoZone = async (data) => {
     
     let zone = await MonitoredZone.findById(data.zone);
     console.log(zone)
     console.log(data.drone)


     zone.drone = zone.drone.filter(x => {data.drone!==x.id })
     await zone.save();

    return { zone}
}

exports.deleteDroneTest = async (_id)=>{
    let zone = await MonitoredZone.findById(_id);

        zone.drone = [];
        zone.save()

    return {zone}
}

exports.getDronebyZone = async (_id) => {
    console.log(_id)
    let zone = await MonitoredZone.findById(_id)
    let drone = [];

    for (var i = 0; i < zone.drone.length; i++) {
        //let element = await Drone.findById(zone.drone[i]);
        let element
        await axios.get("http://skyrone.cf:6789/drone/getById/" + zone.drone[i])
            .then((response) => {
                element = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        drone.push(element)
    }

    return { drone }
}