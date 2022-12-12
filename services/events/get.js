const Events = require("../../models/eventsModel");

const getAllEventServiceByEmail = async (req) => {
  console.log(req.query);
  const events = await Events.find().where("userEmail").in(req.query.email);
  console.log(events);
  if (!events) {
    const error = {
      message: "No record found in customers",
      status: 404,
    };
    throw error;
  }

  return events;
};

module.exports = getAllEventServiceByEmail;
