const route =require("express").Router();
const service =require("../Services/Post_service")

 route.post("/", service.CutoffMarksCalulation);
 module.exports =route;