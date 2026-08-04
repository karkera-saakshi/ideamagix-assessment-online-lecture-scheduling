const lectureModel = require("../model/lectureModel");


let createLecture = (req, res) =>{
    lectureModel.createLecture(req.body, res);
}

let getAllLectures = (req, res) => {
    lectureModel.getAllLectures(res);
};

module.exports = { createLecture, getAllLectures};