
const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require("../model/user");
const saltRounds = 10; //We are setting salt rounds, higher is safer.

// Get all the available colleges
user.get("/api/colleges", (req,res,next) => {

    userModel.find().distinct('college', (err1, res1)=>{
        if(err1)
            res.send(err1);

        res.json(res1);
    });
});

// Get single user 
user.get("/api/users/:id",(req,res,next)=>{
   userModel.findOne({'_id': req.params.id},(err1,res1)=>{
       if(err1)
       res.send(err1);
       if(res1 == null)
       {
           res.json(new Error("user with ID " + req.params.id + " not found"));
       }
       let result = {'_id': res1._id, title: res1.title, name: res1.name, email: res1.email, mobile: res1.mobile };
       res.json(result);
   });
});

user.post("/api/auth/login", (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, res1) => {
        bcrypt.compare(req.body.password, res1.password, function (error, response) {

            // password matches
            if (response == true) {
                res.json({ 'result': 'ok', 'token': res1.token, 'user': res1 });
            }
            else {
                res.json({ 'result': 'none', 'message': 'Login credentials are incorrect' });
            }
        });
    });
});

user.post("/api/users/register", (req, res, next) => {
    // validate that this email doesn't exist 
    userModel.findOne({ email: req.body.email }, (err1, res1) => {
        if (err1)
            res.send(err1);

        // all good to proceed with saving user
        if (res1 == null) {
            let user = req.body;
            bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
                user.password = hash;
                user.token = GenerateAuthToken(user);
                userModel.create(user, (err2, res2) => {
                    if (err2)
                        res.send(err2);
                    res.json({ 'result': 'ok', 'user': res2, 'token': user.token });
                });
            });
        }
        else {
            res.json({ 'result': 'none', 'message': 'Email ' + req.body.email + ' already exists.' });
        }
    });
});

const GenerateAuthToken = function generate(user) {
    const token =
        jwt.sign(
            { name: user.name, email: user.email },
            "SomeSecretKeyByG12"
        );
    return token;
}

module.exports = user;
