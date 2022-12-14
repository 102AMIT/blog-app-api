const express=require('express')
const router=express.Router();
const User=require('../models/User');
const Post=require('../models/Post');
const bcrypt=require('bcrypt');


// UPDATE
router.put("/:id", async(req,res)=>{
    // here we are auth user with passing the userId in params and bcrypt it 
        if(req.body.userId=== req.params.id){
            if(req.body.password){
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
        try{
            const updatedUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },
            // this will help us to update the db and send the updated data
            {new:true}
            );
            res.status(200).json(updatedUser);
            
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("You Can update only your account !");

    }
});


//DELETE

router.delete("/:id", async(req,res)=>{
    // here we are auth user with passing the userId in params and bcrypt it 
        if(req.body.userId=== req.params.id){
            // here we need to find the user and then assosiated post then delete the post after that we can delete the user 
            try{
                const user=await User.findById(req.params.id)
            
                try{
                    // if the user.username and username is same then delete those post posted by user
                    await Post.deleteMany({username:user.username});
                    await User.findByIdAndDelete(req.params.id)
                    
                    res.status(200).json("User deleted...");
                    
                }catch(err){
                    res.status(500).json(err);
                }
            }catch(err){
                res.status(404).json("User not found");
                
            }
        }else{
            res.status(401).json("You Can Delete only your account !");

        }
    });

// GET One User

router.get("/:id", async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})




module.exports=router;