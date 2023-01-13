const express=require("express");
const app=express();
const Port=process.env.PORT ||8000;
const mongoose=require("mongoose");
const dotenv=require("dotenv").config();
const bodyParser=require("body-parser");
const path=require("path")

  
// we need to allow the other host for using this server 


// Add headers before the routes are defined


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://Blog-App.onrender.com');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Pass to next layer of middleware
  next();
});


// for sending the json object 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// for static folder access 
app.use("/images",express.static(path.join(__dirname,"/images")))

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
       cb(null,"images") 
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
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

app.listen(Port,(err)=>{
    if(err){
        console.log("Error In starting Server....");
    }
    console.log("backend server is running Up On Port:",`${Port}`);
})
