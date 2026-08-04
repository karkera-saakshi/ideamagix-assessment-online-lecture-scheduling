const lectureModel = require("../model/lectureModel");


let createLecture = (req, res) =>{
    lectureModel.createLecture(req.body, res);
}

let getAllLectures = (req, res) => {
    lectureModel.getAllLectures(res);
};

let getLecturesByInstructor = (req, res) =>{
    lectureModel.getLecturesByInstructor(req.params.instructorId, res)
}

module.exports = { createLecture, getAllLectures, getLecturesByInstructor};