const mongoose = require("mongoose");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT} || '27017'}/${process.env.DB_NAME}`
const uriTestOnline= "mongodb+srv://nganluu:123456!@nganluu.mxnni.mongodb.net/monitoredZoneService?retryWrites=true&w=majority"
const uriProduct = "mongodb+srv://nganluu:123456!@nganluu.mxnni.mongodb.net/monitoredZoneProduct?retryWrites=true&w=majority"

const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}

mongoose.connect(uri, connectOption)
.then(()=>{
    console.log("Connect DB successfully")
}).catch((error)=>{
    console.log(error.message);
})
