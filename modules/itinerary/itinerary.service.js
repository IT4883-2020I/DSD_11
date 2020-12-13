const { itinerary } = require(SERVER_DIR + "/models");
const { MonitoredZone } = require(SERVER_DIR + "/models");
const axios = require('axios')

exports.setItinerarytoZone = async (data) => {
    let zone = await MonitoredZone.findById(data.zone);
    let itineraryData = data.itinerary;

    if(zone){
        zone.itinerary.push(itineraryData);
        await zone.save();
    }else{
        throw Error("Zone is not exist")
    }
    // let itinerary;

    // if (zone) {
    //     for (var j = 0; j < itineraryData.length; j++) {
    //         await axios.get("http://skyrone.cf:6789/flightPath/getAllBySupervisedArea/" + data.zone)
    //             .then((response) => {
    //                 itinerary = response.data
    //                 console.log(response.data)
    //             }).catch(error => {
    //                 console.log(error)
    //             })


    //         //console.log(itineraryData[j])
    //         console.log(itinerary)
    //         if(itinerary){
    //         zone.itinerary.push(itinerary);
    //         }else {
    //             throw Error("itinerary is null, check again")
    //         }
    //     }

    //     await zone.save();
    // } else {
    //     throw Error("Cannot find zone")
    // }

    return { zone: zone }

}

exports.deleteItinerarytoZone = async (data) => {
     
     let zone = await MonitoredZone.findById(data.zone);
     console.log(zone)
     console.log(data.itinerary)


     zone.itinerary = zone.itinerary.filter(x => {data.itinerary!==x.id })
     await zone.save();

    return { zone}
}

exports.deleteItineraryTest = async (_id)=>{
    let zone = await MonitoredZone.findById(_id);

        zone.itinerary = [];
       await zone.save()

    return {zone}
}

exports.getItinerarybyZone = async (_id) => {
    console.log(_id)
    let zone = await MonitoredZone.findById(_id)
    let itinerary = [];

    for (var i = 0; i < zone.itinerary.length; i++) {
        //let element = await itinerary.findById(zone.itinerary[i]);
        let element
        await axios.get("http://skyrone.cf:6789/itinerary/getById/" + zone.itinerary[i])
            .then((response) => {
                element = response.data
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        itinerary.push(element)
    }

    return { itinerary }
}