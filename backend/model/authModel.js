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

let loginAccount = (obj, res) => {
    let client = new MongoClient(url);
    client.connect()
        .then(() => {
            let db = client.db("lecture-scheduling");
            let coll = db.collection("users");
            return coll.findOne({ email: obj.email, password: obj.password });
        })
        .then((result) => {
            if (!result) {
                return res.status(401).send({ message: "Invalid email or password" });
            }
            return res.status(200).json(result);
        })
        .catch((err) => {
            console.error("Login error:", err);
            return res.status(500).send({ message: "Server error during login", error: err.message });
        })
        .finally(() => client.close());
};
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