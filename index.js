const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();

// for sending the json object 
app.use(express.json())

// routes

const authRoute=require('./routes/auth')


// DB connection
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongoDB"))
.catch(err=>{
    console.log("DB Connection Error",err);
});

// use routes
app.use('/api/auth',authRoute);



// app listen 
app.listen("8000",(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up");
})
