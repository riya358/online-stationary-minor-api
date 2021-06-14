const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const myUserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean
    },
    profile: {
        data: Buffer, contentType: String
    },
    college: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true
    },
    branch: {
        type: String

    },
    city: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true
    },
    token: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("user", myUserSchema);