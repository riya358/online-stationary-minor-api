const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const loginSchema = new Schema({
    uname:{
        type:String,
        required: true
    },
    pass:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        
    },
    uni_name:{
        type:String,
        
    },
    mail:{
        type:String,
       
    }
});
module.exports= mongoose.model("login",loginSchema); 