const authModel = require("../model/authModel");


let createAccount = (req, res) =>{
    authModel.createAccount(req.body, res);
}

let loginAccount = (req, res) =>{
    authModel.loginAccount(req.body, res);
}


module.exports = { createAccount, loginAccount};
