const db = require("../Shared/mongo");


const getDataHelper ={

    GetData(){
        return db.Users.find().toArray();
    }

}
module.exports =getDataHelper;