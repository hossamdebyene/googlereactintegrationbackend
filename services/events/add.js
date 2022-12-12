const events = require("../../models/eventsModel");

const addEventService = async (body) => {
  const newEvent = await events.create(body);

  if (!newEvent) {
    const error = {
      message: "No event added",
      status: 404,
    };
    throw error;
  }

  return newEvent;
};
const addEventsService = async (body) => {
  const existingEvents = await events.find();
  let addingEvents = [];
  let deletedEvents = [];
  await Promise.all(
    body.map((event) => {
      const exist = existingEvents.find(
        (events) => events.googleId === event.googleId
      );
      if (!exist) {
        addingEvents.push(event);
      }
    })
  );
  await Promise.all(
    existingEvents.map((event) => {
      const exist = body.find((events) => events.googleId === event.googleId);
      if (!exist) {
        deletedEvents.push(event);
      }
    })
  );
  const newEvents = await events.insertMany(addingEvents);
  await events.deleteMany({ _id: deletedEvents });

  if (!newEvents) {
    const error = {
      message: "No event added",
      status: 404,
    };
    throw error;
  }

  return newEvents;
};

module.exports = { addEventService, addEventsService };
