const express= require("express");
const user = express.Router();
const storeModel = require("../model/store");
const loginModel = require("../model/login");
const { render } = require("ejs");
exports.pen=(req,res,next)=>{
    const find = storeModel.find({name:{$in:["pen","Pen"]}});
    find.exec((err,data)=>{
        if(err)
        throw err;
        res.render("pen",{ title:"Pen",store:data , user:''})
    })

};
exports.paper=(req,res,next)=>{
    const find = storeModel.find({name:{$in:["Pin","pin"]}});
    find.exec((err,data)=>{
        if(err)
        throw err;
        res.render("paper",{title:"PaperPins",store:data,user:''})
    })

};
exports.greeting=(req,res,next)=>{
    const find = storeModel.find({name:{$in:["Greeting","greeting"]}});
    find.exec((err,data)=>{
        if(err)
        throw err;
        res.render("greeting",{title:"Greetings",store:data, user:''})
    })

};
exports.books=(req,res,next)=>{
    const find = storeModel.find({name:{$in:["Book","book"]}});
    find.exec((err,data)=>{
        if(err)
        throw err;
        res.render("Books",{title:"Books",store:data, user:''})
    })

};
exports.details=(req,res,next)=>{
    const id = req.params.storeid;
    storeModel.findById(id).then((result)=>{
        res.render("details",{ title:"Product Details",store:result, user:''})
    })
}
exports.login=(req,res,next)=>{

    res.render("login",{title:"Login/Signup", error:'', success:'', user:''})
} 
exports.signin=(req,res,next)=>{
      const Uname = req.body.Uname;
      const Pass = req.body.Pass;
      const Contact = req.body.Contact;
      const Uni_name = req.body.Uni_name;
      const Mail = req.body.Mail;
     
      if(Uname=="NodeJs" && Pass=="MongoDb"){
          res.render("addpro",{title:"AdminPage", success:"", user:''});
          res.render("login",{title:" ",contact:Contact})
      }
      else{ 
loginModel.find({$and:[{uname:{$eq:Uname}},{pass:{$eq:Pass}}]}).then((result)=>{
         if(result!=''){
            
          res.render("home",{title:"Welcome to the stationary store", user:Uname}); 
         }
         else{
             
          res.render("login",{title:"login/signup", user:'',success:'Invalid Details',error:''}); 
         }
    });
    
          
    }
}
