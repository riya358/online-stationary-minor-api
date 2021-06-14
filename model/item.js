
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    name:{
        type:String,
        required: true,
        lowercase: true, 
        trim: true
    },
    title:{
        type:String,
        required: true,
        lowercase: true, 
        trim: true
    },
    price:{
        type:Number,
        required: true,
    },
    description:{
        type:String,  
    },
    // image // TODO
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    college: {
        type:String,
        required: true,
        lowercase: true, 
        trim: true
    }
})

module.exports=mongoose.model("item", itemSchema);