const courseModel = require("../model/courseModel");


let createCourse = (req, res) =>{
    courseModel.createCourse(req.body, res);
}

let getAllCourses = (req, res) => {
    courseModel.getAllCourses(res);
}

module.exports = { createCourse, getAllCourses };
