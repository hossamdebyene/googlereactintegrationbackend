const express = require("express");
const router = express.Router();
const addEventController = require("../controllers/events/add");
const getEventController = require("../controllers/events/get");

// Home page route.
router.post("/", addEventController.addEventController);
router.get("/", getEventController.getAllEventByEmailController);

module.exports = router;
