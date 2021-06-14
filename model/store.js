
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productschema = new Schema({
    
    name:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    des:{
        type:String,
        
    },
    image:String,
    

})

module.exports=mongoose.model("Store",productschema);