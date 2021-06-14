
const express = require("express");
const item = express.Router();
const itemModel = require("../model/item");
const userModel = require("../model/user");

item.post("/api/items", (req, res, next) => {
    // get user object from the db
    userModel.findOne({ email: req.body.sellerEmail }, (err1, res1) => {
        if (err1)
            res.send(err1);

        if (res1 == null)
            res.send(new Error("sellerEmail is incorrect"));

        // create new item object
        let newItem = { name: req.body.name, title: req.body.title, price: req.body.price, description: req.body.description, user: res1, college: res1.college };

        itemModel.create(newItem, (err, res1) => {
            res.json(res1);
        });
    });
});

item.post("/api/items/search", (req, res, next) => {
    const college = req.body.college;
    let partialToMatch = new RegExp(req.body.search, 'i');
    itemModel.find({ 'title': partialToMatch, 'college': college }, (err1, res1) => {
        res.json(res1);
    });
});

module.exports = item;
