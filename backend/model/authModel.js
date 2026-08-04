const { MongoClient, ObjectId } = require("mongodb");
let url = process.env.MONGODB_URI;
let getCollection = () => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("users");
    let coll = db.collection("lecture-scheduling");
    return { client, coll};
};

let createAccount = (obj, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("users");
    coll.insertOne(obj)
    .then((result)=> res.send(result))
    .catch((err)=>res.send(err))
    .finally (()=>client.close())
}

let loginAccount = (obj, res) =>{
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("users");
    coll.findOne({ email: obj.email, password: obj.password })
    .then((result)=> res.send(result))
    .catch((err)=>res.send(err))
    .finally (()=>client.close())
}

let getInstructors = (res) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("lecture-scheduling");
    let coll = db.collection("users");

    coll.find({ role: "instructor" }).toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
    .finally(() => client.close());
};

module.exports = { createAccount, loginAccount, getInstructors };