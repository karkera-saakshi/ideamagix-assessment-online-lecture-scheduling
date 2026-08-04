const courseModel = require("../model/courseModel");


let createCourse = (req, res) =>{
    courseModel.createCourse(req.body, res);
}


module.exports = { createCourse };
