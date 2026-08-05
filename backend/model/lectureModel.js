const { MongoClient, ObjectId } = require("mongodb");
let url = process.env.MONGODB_URI;
let getCollection = () => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture");
    let coll = db.collection("lecture-scheduling");
    return { client, coll};
};

let createLecture = (obj, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("lecture");
    coll.findOne({ instructorId: obj.instructorId, date: obj.date })
    .then((existingLecture) => {
        if (existingLecture) {
            return res.status(400).send({ message: "Instructor already assigned on this date" });
        }
        let newLecture = {
            courseId: obj.courseId,
            courseName: obj.courseName,
            batchName: obj.batchName,
            instructorId: obj.instructorId,
            instructorName: obj.instructorName,
            date: obj.date,
            time: obj.time
        };
        return coll.insertOne(newLecture).then((result) => res.status(201).send(result));
    })
    .catch((err) => res.send(err))
    .finally(() => client.close());
}

let getAllLectures = (res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("lecture");
    coll.find().toArray()
    .then((result)=>res.send(result))
    .catch((err)=>res.send(err))
    .finally(()=>client.close())
}

let getLecturesByInstructor = (instructorId, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("lecture");
    coll.find({ instructorId: instructorId }).toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
    .finally(() => client.close());
}

module.exports = { createLecture, getAllLectures, getLecturesByInstructor };