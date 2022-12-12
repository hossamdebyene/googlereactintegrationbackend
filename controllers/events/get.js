const getAllEventServiceByEmail = require("../../services/events/get");

const getAllEventByEmailController = async (req, res) => {
  try {
    const result = await getAllEventServiceByEmail(req);
    console.log(result)
    res.statusCode = 200;
    res.send(result);
  } catch (error) {
    const errorStatus = error.status || 500;

    res.statusCode = errorStatus;
    res.sendStatus(errorStatus);
  }
};

module.exports = { getAllEventByEmailController };
