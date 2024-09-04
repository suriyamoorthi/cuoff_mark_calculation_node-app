const route =require("express").Router();
const service =require("../Services/Post_service")

 route.post("/CutoffMarksCalulation", service.CutoffMarksCalulation);
 module.exports =route;