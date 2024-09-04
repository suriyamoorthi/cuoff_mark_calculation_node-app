require("dotenv").config();

const cors = require("cors");
const express = require("express");

const mongo = require("./Shared/mongo");
const routes = require("./Routes/Post_route");

const app = express();

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await mongo.connect();

    //MIddleware
    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
      console.log(`${new Date()} - ${req.method} - ${req.url}}`);
      next();
    });

    // app.use((req, res, next) => {
    //     IS_MAINTENANCE ? res.send({ message: "site is under maintaence" }) : next();
    // });
    console.log("Midlleware initalized");
    //routes
    app.use("/Users", routes);
    console.log("Routes initialzation");

    //port

    app.listen(PORT, () => console.log(`server listenting at port ${PORT}`));
  } catch (err) {
    console.log("Error starting application-", err.message);
  }
})();
