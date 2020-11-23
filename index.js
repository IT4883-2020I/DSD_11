var express = require('express');
var bodyParser = require('body-parser'); //convert from json to object
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
const monitoredAreaRoute = require('./modules/monitoredArea/monitoredArea.route')
app.use("/area", monitoredAreaRoute);


var port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log("Server is running at port "+ port)
})