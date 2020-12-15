const { Incident } = require(SERVER_DIR + "/models");

exports.getIncidentbyId = async (_id) => {
    let incident = await Incident.findById(_id);
    return {incident}
}

exports.getAllIncident = async () => {
    let incident = await Incident.find();
    return {incident}
}