//connect server
const { MonitoredZone, MonitoredArea, Drone, Incident } = require('../models');
const mongoose = require("mongoose")

initDB = async () => {
    const mongoose = require('mongoose');
    require('dotenv').config()
    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT} || '27017'}/${process.env.DB_NAME}`
    const uriTestOnline = "mongodb+srv://nganluu:123456!@nganluu.mxnni.mongodb.net/monitoredZoneService?retryWrites=true&w=majority"
    const uriProduct = "mongodb+srv://nganluu:123456!@nganluu.mxnni.mongodb.net/monitoredZoneProduct?retryWrites=true&w=majority"

    const connectOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    const dbTest = mongoose.connect(uriTestOnline, connectOption).then(
        () => console.log("Connect successfully")
    ).catch((err) => { console.log(err) })
    if (!dbTest) {
        throw Error("db is not defined")
    };

    monitoredAreaData = [];
    monitoredZoneData = [];
    itineraryData = [];
    incidentData = [{
        name: "Chayrung"
    },
    {
        name: "Dedieu"
    },
    {
        name: "Luoidien"
    },
    {
        name: "Caytrong"
    }
    ]

    // var incident = await Incident.insertMany(
    //     incidentData
    // )

    monitoredAreaData.push({
        name: "Núi Hàm Lợn",
        startPoint: {
            longitude: 105.7886,
            latitude: 21.3124
        },
        endPoint: {
            longitude: 108.0002,
            latitude: 22.3456
        },
        code: "MA0001",
        maxHeight: 100, 
        minHeight: 80,
        priority: 0,
        level: 0, 
        times: 0,
        description: "Nui Ham Lon co mat do cay rung cao, nam o khu vuc it xay ra nguy co"
    })

    monitoredZoneData.push({
        area: "5fcb03c3a2747e2774dac196",
        name: "Núi Hàm Lợn Bắc",
        code: "MZ0001",
        minHeight: 80,
        maxHeight: 100,
        startPoint: {
            longitude: 105.7886,
            latitude: 21.3124
        },
        endPoint: {
            longitude: 105.7903,
            latitude: 21.3130
        },
        priority: 0,
        itinerary: [],
        description: "Khu vuc phia bac nui ham lon",
        times: 0,
        level: 0,
        active: true,
        incidentType: "5fcb1972186fca1f9c9728eb"
    })



    // for (var i = 0; i < 100; i++) {
    //     monitoredAreaData.push({
    //         name: "Nui " + i,
    //         code: "AR" + i,
    //         startPoint: { longitude: parseInt(Math.random() * (180 - (-180)) - 180).toFixed(5), latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5) },
    //         endPoint: { longitude: (Math.random() * (180 - (-180)) - 180).toFixed(5), latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5) },
    //         maxHeight: (Math.random() * (120 - 100) + 100).toFixed(0),
    //         minHeight: (Math.random() * (100 - 90) + 90).toFixed(0),
    //         priority: (Math.random() * (0, 1, 2)).toFixed(0),
    //         level: (Math.random() * (0, 1, 2)).toFixed(0),
    //         times: (Math.random() * (20 - 1) + 1).toFixed(0),
    //         description: "Nui " + i + " la vung nui hiem tro, co nhieu nguy co xay ra su co"
    //     })

    // }

    // var monitoredArea = await MonitoredArea.insertMany(

    //     monitoredAreaData

    // )


    // for (var i = 0; i < 100; i++) {

    //     monitoredZoneData.push({
    //         area: monitoredArea[i],
    //         code: "ZO" + i,
    //         startPoint: { longitude: (Math.random() * (180 - (-180)) - 180).toFixed(5), latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5) },
    //         endPoint: { longitude: (Math.random() * (180 - (-180)) - 180).toFixed(5), latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5) },
    //         radius: (Math.random() * (10000 - 1) - 1).toFixed(0),
    //         maxHeight: (Math.random() * (120 - 100) + 100).toFixed(0),
    //         minHeight: (Math.random() * (100 - 90) + 90).toFixed(0),
    //         priority: (Math.random() * (0, 1, 2)).toFixed(0),
    //         level: (Math.random() * (0, 1, 2)).toFixed(0),
    //         times: (Math.random() * (20 - 1) + 1).toFixed(0),
    //         description: "Nui " + i + " la vung nui hiem tro, co nhieu nguy co xay ra su co"
    //     })


    // }
    var monitoredZone = await MonitoredZone.insertMany(
        monitoredZoneData
    )

    // for (var i = 0; i < 100; i++) {
    //     droneData.push({
    //         monitoredZone: monitoredZone[i],
    //         isUsed: Math.random() <= 0.5,
    //         idLog: Math.random().toFixed(0),
    //         flightTime: Math.random().toFixed(0),
    //         brand: "UAV",
    //         color: "white",
    //         dimensions: "3x2x3",
    //         weight: 15,
    //         photography: "https://localhost:3000/images",
    //         videoCapture: "http://localhost:3000/capturedVideos",
    //         maxSpeed: (Math.random() * (60 - 50) + 50).toFixed(0),
    //         maxFlightTime: (Math.random() * (10 - 8) + 10).toFixed(0),
    //     })
    // }

    // var drone = await Drone.insertMany(
    //     droneData
    // )
    // for (var i = 0; i < 100; i++) {
    //     var itemArea = await MonitoredArea.findOne({ _id: monitoredZone[i].area._id }).exec();
    //     itemArea.monitoredZone.push(monitoredZone[i]);
    //     itemArea.save()

    //     var itemZone = await MonitoredZone.findOne({ _id: drone[i].monitoredZone._id }).exec();
    //     itemZone.drone.push(drone[i]);
    //     itemZone.save();
    // }


    //console.log("Tao du lieu thanh cong", monitoredArea)

}
//call models
initDB().then(() => {
    console.log("Tao xong")
}).catch((err) => {
    console.log(err)
});
