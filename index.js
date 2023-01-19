const express=require("express");
const app=express();
const Port=process.env.PORT ||8000;
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const bodyParser=require("body-parser");
const path=require("path")
const multer=require("multer")
// const cors=require("cors");
// app.use(cors());

  
// we need to allow the other host for using this server 


// Add headers before the routes are defined


app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"https://blog-app-inax.onrender.com/");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// for sending the json object 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// for static folder access 
app.use("/images",express.static(path.join(__dirname,"/images")))

// routes
// Multer implementation
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"images") 
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})


const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{ 
    res.status(200).json("File has been uploaded")
});

const authRoute=require('./routes/auth')
const userRoute=require('./routes/user');
const postRoute=require('./routes/post');
const categoryRoute=require('./routes/categories');

// DB connection
mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongoDB"))
.catch(err=>{
    console.log("DB Connection Error",err);
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

app.listen(Port,(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up On Port:",`${Port}`);
})
