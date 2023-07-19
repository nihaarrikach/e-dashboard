const mongoose=require('mongoose');

const loginSchema=new mongoose.Schema({
    email:String,
    password:String
})
//collectionname,schema
module.exports=mongoose.model("login",loginSchema)