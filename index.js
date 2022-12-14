const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();

// for sending the json object 
app.use(express.json())

// routes

const authRoute=require('./routes/auth')
const userRoute=require('./routes/user');
const postRoute=require('./routes/post');
const categoryRoute=require('./routes/categories');
const multer=require("Multer")

// DB connection
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongoDB"))
.catch(err=>{
    console.log("DB Connection Error",err);
});


// Multer implementation
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,'images') 
    },filename:(req,file,cb)=>{
        cb(null,"req.body.name")
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
});

// use routes
// this is for auth
app.use('/api/auth',authRoute);

// this is for user
app.use('/api/user',userRoute);

// this is for post
app.use('/api/posts',postRoute);

// this is for category
app.use('/api/categories',categoryRoute);

// Multer imple,ment

// app listen 

app.listen("8000",(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up");
})
