const { Incident } = require(SERVER_DIR + "/models");
const axios = require('axios');
const { response } = require('express');

exports.getIncidentbyId = async (_id, token) => {
    // let incident = await Incident.findById(_id);
    let incident;
    let headers = {
        'token': token,
    }
    await axios.get("http://distributed.de-lalcool.com/api/projectType/" + _id, {headers})
                .then((response)=>{
                    incident = response.data.result
                })
    return {incident}
}

exports.getAllIncident = async (token) => {
    //let incident = await Incident.find();
    let incident;
    let headers = {
        'token': token,
    }
    await axios.get("http://distributed.de-lalcool.com/api/projectType", {headers})
    .then((response) => {
        incident = response.data.result
    })
    return {incident}
}