const mongoose = require("mongoose");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT} || '27017'}/${process.env.DB_NAME}`

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