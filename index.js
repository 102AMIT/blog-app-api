const express=require("express");
const app=express();

app.use('/',(req,res)=>{
    res.end(`<h1>Hello</h1>`)
})

app.listen("8000",(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up");
})
