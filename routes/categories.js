const express=require('express')
const router=express.Router();

const Category=require('../models/Category');

router.post('/',async (req,res)=>{
    const newCat=new Category(req.body);

    try{
        const savedCat=await newCat.save();
        res.status(200).json(savedCat)
    }catch(err){
        res.status(500).json(err);
    }

})

router.get('/',async (req,res)=>{

    try{
        const Cast=await Category.find();
        res.status(200).json(Cast);
    }catch(err){
        res.status(500).json(err);
    }

})

module.exports=router;