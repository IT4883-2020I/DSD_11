const jwt = require("jsonwebtoken");
const http = require("http");
const axios = require("axios");
const { head } = require("../modules/monitoredArea/monitoredArea.route");

exports.auth = async (req, res, next) => {
    try {
   
        let headers = {
            'api-token': req.headers.token,
            'project-type': "CHAY_RUNG"
        }
        console.log(headers["api-token"])

        let result;
        await axios.post("https://distributed.de-lalcool.com/api/verify-token", {}, headers)
            .then((response) => {
                result = response.status
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        if(result==200){
            next()
        } else {
            throw Error("unauth")
        }    
       

    } catch (error) {
        res.status(400).json({
            success: false,
            content: error.message
        })
    }
}