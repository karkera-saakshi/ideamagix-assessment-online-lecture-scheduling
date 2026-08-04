const { MongoClient, ObjectId } = require("mongodb");
let url = process.env.MONGODB_URI;
let getCollection = () => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("course");
    let coll = db.collection("lecture-scheduling");
    return { client, coll};
};

let createCourse = (obj, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("courses");

    let newCourse = {
        name: obj.name,
        level: obj.level,
        description: obj.description,
        image: obj.image,
        batches: obj.batches || []
    };

    coll.insertOne(newCourse)
    .then((result)=> res.send(result))
    .catch((err)=>res.send(err))
    .finally (()=>client.close())
}

module.exports = { createCourse };