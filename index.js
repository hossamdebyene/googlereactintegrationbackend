const express = require("express");
const { google } = require("googleapis");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const url = require("url");
const eventRoutes = require("./routes/eventRoutes");
const eventBulkAddService = require("./services/events/add");
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

const uri =
  "mongodb+srv://abd:abd@cluster0.n22wh.mongodb.net/?retryWrites=true&w=majority";
const connectmongoose = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectmongoose();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.CALLBACK_URL
);

SCOPES = "email profile https://www.googleapis.com/auth/calendar";

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [SCOPES],
  include_granted_scopes: true,
});

app.post("/", (req, res) => {
  res.status(200).send({ location: authorizationUrl, credentials: oauth2Client });
});

app.use("/event", eventRoutes);

const getCredentials = (res) =>
  new Promise((resolve, reject) => {
    let cred = oauth2Client.setCredentials(res);
    resolve(cred);
  });

app.post("/o2authcallback", async (req, res) => {
  let q = url.parse(req.body.body, true).query;
  // Get access and refresh tokens
  oauth2Client.getToken(q.code).then(async (response) => {
    const cred = await getCredentials(response.tokens);
    const userInfo = JSON.parse(
      Buffer.from(response.tokens.id_token.split(".")[1], "base64").toString()
    );
    console.log(userInfo)

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    calendar.events.list(
      {
        calendarId: userInfo.email,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      async (err1, res1) => {
        if (err1) return console.log("The API returned an error: " + err1);
        const data = [];
        await Promise.all(
          res1.data.items.map((event) => {
            console.log(res1.data.items.length);
            data.push({
              email: event?.creator?.email,
              summary: event?.summary,
              status: event?.status,
              googleId: event?.id,
              userEmail: userInfo.email,
            });
          })
        );
        console.log(data);
        await eventBulkAddService.addEventsService(data);
        res.send(userInfo);
      } 
    );
  });
});
app.listen(5006, () => console.log(`App listening on port 5006!`));
