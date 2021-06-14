
const express = require("express");
const  admin = express.Router();
const storeModel = require("../model/store");
const multer = require("multer");
const path = require("path");
const { diskStorage } = require("multer");
admin.use(express.static(path.join("public")));

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
var upload = multer({
    storage: Storage
    
}).single('file');

admin.get("/addpro",(req,res,next)=>{
    res.render("addpro",{success:''});
});
admin.post("/post",upload,(req,res,next)=>{
    const name = req.body.name;
    const title = req.body.title;
    const price = req.body.price;
    const des = req.body.des;
    const image = req.file.filename;

    const store = new storeModel({
        name:name,
        title : title,
        price : price,
        des : des, 
        image : image
    
    });

    
    store.save().then(result=>{
        // res.json({
        //     status:"success",
        //     message:"product added successfully",
        //     data: result,
        // });
        res.render("addpro",{ store: result, success:'Product added Successfully'

            })
    }).catch((err)=>{
        res.json({
            status:"failed",
            message:"not added",
            data: err,
        })
    })

})
 admin.get('/showpro',(req,res,next)=>{
    storeModel.find({}).then(
        result=>{
            // res.json({
            //     status: "success",
            //     data:result,
            // })
            res.render("showpro",{ store: result, success:''

            })
        })
})
 admin.get('/delete/:storeid',(req,res,next)=>{
    const store = req.params.storeid;
    storeModel.deleteOne({_id:store}).exec(function(err){
        if(err) throw err;;
    storeModel.find({}).exec(function(err,data){
        res.render("showpro",{ store: data, success: "Records deleted successfully",

    })
    })
 })
})

admin.get("/edit/:storeid",(req,res,next)=>{
    const store = req.params.storeid;
    var edit= storeModel.findById(store);
    edit.exec(function(err,data){
    if(err) throw err;
    res.render('update', {store:data ,success:'' });
  });
});

admin.post("/update",upload,(req,res,next)=>{
    const name = req.body.name; 
    const title = req.body.title;
    const price = req.body.price;
    const des = req.body.des;
    const image = req.file.filename;
    storeModel.updateOne({name:name , title:title , price:price , des : des , image :image}).then((result)=>{
        res.render("addpro",{
            success:"Update successfully",
        })
    })
});

module.exports=admin;
