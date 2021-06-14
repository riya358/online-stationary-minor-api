const { Router } = require("express");
const express = require("express");
const  app = express.Router();
const user = require("../controller/user");

const loginModel = require("../model/login");
const {check , validationResult}= require("express-validator");
const { sanitizeBody}= require('express-validator/filter');


app.use("/pen",user.pen);
app.use("/greeting",user.greeting);
app.use("/paper",user.paper);
app.use("/books",user.books);

app.get("/details/:storeid",user.details);
app.get("/",(req,res,next)=>{
    res.render("home",{title: "Welcome to the Stationary Store", user:''});
    
});
app.post("/signin",user.signin);
app.use("/login",user.login);
app.post("/signup",[check("uname","Only Alphabets Allowed").isAlpha(),check("uni_name"),check("mail"),check("pass","Minimum 5 letter allowed").isLength({min:5}).trim()
,check("cpass").custom((value, {req})=>{
 if(value!= req.body.pass){
     throw new Error("Password Confirmation does not match Password");
 }
 else{
     return true;
 }
})],(req,res,next)=>{
    const errors = validationResult(req);
    console.log(errors.mapped());
    if(errors.isEmpty()){
    const uname = req.body.uname;
    const pass = req.body.pass;
    const cpass = req.body.cpass;
 loginModel.insertMany({uname:uname,pass:pass}).then((result)=>{
     console.log("successfully inserted");
          res.render("login",{title:"login/signup", error:'', success :"Signup Successfully", user:''});

 });
}
else{
    res.render("login",{title:"Incorrect Details", error: errors.mapped(), success :"Signup UnSuccessfull",user:''})
}
}
);

module.exports = app;