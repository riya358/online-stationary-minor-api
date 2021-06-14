const express = require("express");
const app = express();
const path = require("path");
const router = require("./router/stationary");
const admin = require("./router/admin");
const user = require("./router/user");
const item = require("./router/item");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));
mongoose.connect("mongodb+srv://riya:riya1234@cluster0.qzwpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, }).then(result => {
  console.log("database connected successfully");
}).catch((err) => {
  console.log("failed", err);
})
app.set("view engine", "ejs")
app.use(user);
app.use(item);
app.use(router);
app.use(admin);
app.listen(8080);