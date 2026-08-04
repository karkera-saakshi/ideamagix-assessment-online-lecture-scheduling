const authModel = require("../model/authModel");


let createAccount = (req, res) =>{
    authModel.createAccount(req.body, res);
}

let loginAccount = (req, res) =>{
    authModel.loginAccount(req.body, res);
}

let getInstructors = (req, res) => {
    authModel.getInstructors(res);
};

module.exports = { createAccount, loginAccount, getInstructors };
