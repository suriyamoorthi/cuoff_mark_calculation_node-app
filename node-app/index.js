require("dotenv").config();

const cors = require ("cors");
const express = require("express");


 const mongo = require("./Shared/mongo");
 const routes = require("./Routes/Post_route");


// const {logging , maintance}=routes 

const app = express();

const PORT= process.env.PORT || 3001;



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
        // app.use(logging);
        // app.use(maintance);
        console.log("Midlleware initalized")
        //routes

        // app.get("/", (_, res) => res.send("welcome to guvio0"));
        // app.get("/server-date", (_, res) => res.send({ date: new Date() }));
        // app.use("/auth", routes.authRoutes);
        // app.use("/posts", routes.postRoutes);
         app.use("/Users", routes);
        // app.use("/LoginRegister", routes.LoginRegisterRoutes);
        // app.use("/Adminappionment", routes.adminappionmentRoutes);
        // app.use("/appionment", routes.appionmentRoutes);
        // app.use("/profile", routes.profileRoutes);
        // console.log("Routes initialzation");


        //port

        app.listen(PORT, () => console.log(`server listenting at port ${PORT}`));
    }
    catch (err) {
        console.log("Error starting application-", err.message);
    }

})();
