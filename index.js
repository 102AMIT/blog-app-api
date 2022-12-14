const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();

// DB connection
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongoDB"))
.catch(err=>{
    console.log("DB Connection Error",err);
});


app.use('/',(req,res)=>{
    res.end(`<h1>Hello</h1>`)
})

app.listen("8000",(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up");
})
