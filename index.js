var express = require('express');
var bodyParser = require('body-parser'); //convert from json to object
var cors = require("cors")
var app = express();

require('dotenv').config();
require('./global');

require(SERVER_DIR + "/connection");

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)


app.use(bodyParser.json());
app.use(cors())
const monitoredAreaRoute = require('./modules/monitoredArea/monitoredArea.route')
const monitoredZoneRoute = require('./modules/monitoredZone/monitoredZone.route');
const droneRoute  = require('./modules/drone/drone.route')
app.use("/area", monitoredAreaRoute);
app.use("/monitoredzone", monitoredZoneRoute);
app.use("/monitoredzoneuav", droneRoute);


var port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log("Server is running at port "+ port)
})