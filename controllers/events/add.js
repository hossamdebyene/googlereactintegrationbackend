const addEventService = require("../../services/events/add");

const addEventController = async (req, res) => {
  try {
    console.log("HELLO");
    const result = await addEventService.addEventService(req?.body);
    res.status = 201;
    res.send(result);
  } catch (error) {
    const errorStatus = error.status || 500;
    res.statusCode = errorStatus;
    res.send(errorStatus);
  }
};
const addEventsController = async (req, res) => {
  try {
    console.log("HELLO");
    const result = await addEventService.addEventsService(req?.body);
    res.status = 201;
    res.send(result);
  } catch (error) {
    const errorStatus = error.status || 500;
    res.statusCode = errorStatus;
    res.send(errorStatus);
  }
};

module.exports = {addEventController, addEventsController};
