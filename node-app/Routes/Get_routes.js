const route =require("express").Router();
const service =require("../Services/Get_service")

route.get("/",service.getUserMarkDetails);
module.exports =route;