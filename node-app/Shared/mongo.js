// const { connect } = require("formik");
const { MongoClient } = require("mongodb");
// const MANGO_DB_URL = "mongodb://localhost:27017";
// const MANGO_DB_NAME = "guvi";

const mongo = {
    db: null,
    Users: null,

    async connect() {
        const client = new MongoClient(process.env.MANGO_DB_URL);
        await client.connect();

        console.log(`mongo connected successfully- ${process.env.MANGO_DB_URL}`);

        this.db = await client.db(process.env.MANGO_DB_NAME);

        console.log(`DB select -${process.env.MANGO_DB_NAME}`);


        this.Users = this.db.collection("Users");
        console.log(`collection intialized`);

    },
};

module.exports = mongo;