const jwt = require("jsonwebtoken");
const http = require("http");
const axios = require("axios");
const { type } = require("os");

exports.auth = async (req, res, next) => {
    try {

        let headers = {
            'api-token': req.headers.token,
            'project-type': req.headers.projecttype
        }
        console.log(headers["api-token"])
        console.log(headers["project-type"])

        let result;
        await axios.get("https://distributed.de-lalcool.com/api/verify-token", { headers: headers })
            .then((response) => {
                result = response.data.result
                global.user = result
            }).catch(error => {
                console.log(error)
            })
        if (result) {
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