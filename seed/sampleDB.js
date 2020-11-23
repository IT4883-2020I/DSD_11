//connect server
const { MonitoredZone, MonitoredArea, Drone } = require('../models');

initDB = async () => {
    const mongoose = require('mongoose');
    require('dotenv').config()
    // const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT} || '27017'}/${process.env.DB_NAME}`
    const uri = "mongodb+srv://nganluu:123456!@nganluu.mxnni.mongodb.net/monitoredarea?retryWrites=true&w=majority"

    const connectOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    const dbTest = mongoose.connect(uri, connectOption).then(
        () => console.log("Connect successfully")
    ).catch((err) => { console.log(err) })
    if (!dbTest) {
        throw Error("db is not defined")
    };

    monitoredAreaData = [];
    monitoredZoneData = [];
    droneData = [];

    for (var i = 0; i < 100; i++) {
        monitoredAreaData.push({
            name: "Nui " + i,
            longitude: (Math.random() * (180 - (-180)) - 180).toFixed(5),
            latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5),
            radius: (Math.random() * (10000 - 1) - 1).toFixed(0),
            maxHeight: (Math.random() * (120 - 100) + 100).toFixed(0),
            minHeight: (Math.random() * (100 - 90) + 90).toFixed(0),
            priority: (Math.random() * (0, 1, 2)).toFixed(0),
            description: "Nui " + i + " la vung nui hiem tro, co nhieu nguy co xay ra su co"
        })



        // droneData.push({
        //     isUsed: Math.random() <= 0.5,
        //     idLog: Math.random().toFixed(0),
        //     flightTime: Math.random().toFixed(0),
        //     brand: "UAV",
        //     color: "white",
        //     dimensions: "3x2x3",
        //     weight: 15, 
        //     photography: "https://localhost:3000/images",
        //     videoCapture: "http://localhost:3000/capturedVideos",
        //     maxSpeed: (Math.random()*(60-50)+50).toFixed(0),
        //     maxFlightTime: (Math.random()*(10-8)+10).toFixed(0),
        // })
    }






    var monitoredArea = await MonitoredArea.insertMany(

        monitoredAreaData

    )

    for (var i = 0; i < 100; i++) {

        monitoredZoneData.push({
            area: monitoredArea[i],
            longitude: (Math.random() * (180 - (-180)) - 180).toFixed(5),
            latitude: (Math.random() * (90 - (-90)) - 90).toFixed(5),
            radius: (Math.random() * (10000 - 1) - 1).toFixed(0),
            maxHeight: (Math.random() * (120 - 100) + 100).toFixed(0),
            minHeight: (Math.random() * (100 - 90) + 90).toFixed(0),
            priority: (Math.random() * (0, 1, 2)).toFixed(0),
            description: "Nui " + i + " la vung nui hiem tro, co nhieu nguy co xay ra su co"
        })


    }
    var monitoredZone = await MonitoredZone.insertMany(
        monitoredZoneData
    )

    for (var i = 0; i < 100; i++) {
        droneData.push({
            monitoredZone: monitoredZone[i],
            isUsed: Math.random() <= 0.5,
            idLog: Math.random().toFixed(0),
            flightTime: Math.random().toFixed(0),
            brand: "UAV",
            color: "white",
            dimensions: "3x2x3",
            weight: 15,
            photography: "https://localhost:3000/images",
            videoCapture: "http://localhost:3000/capturedVideos",
            maxSpeed: (Math.random() * (60 - 50) + 50).toFixed(0),
            maxFlightTime: (Math.random() * (10 - 8) + 10).toFixed(0),
        })
    }

    var drone = await Drone.insertMany(
        droneData
    )
    for (var i = 0; i < 100; i++) {
        var itemArea = await MonitoredArea.findOne({ _id: monitoredZone[i].area._id }).exec();
        itemArea.monitoredZone.push(monitoredZone[i]);
        itemArea.save()

        var itemZone = await MonitoredZone.findOne({ _id: drone[i].monitoredZone._id }).exec();
        itemZone.drone.push(drone[i]);
        itemZone.save();
    }


    console.log("Tao du lieu thanh cong", monitoredArea)

}
//call models
initDB().then(() => {
    console.log("Tao xong")
}).catch((err) => {
    console.log(err)
});
