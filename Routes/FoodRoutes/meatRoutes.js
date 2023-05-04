const express=require('express');
const { MeatModel } = require('../../Model/FoodModel/meatModel');
const meatsRoute=express.Router()
// create meats 
meatsRoute.post('/add',async(req,res)=>{
    const name = req.body.name;
    try{
        const existingProduct = await MeatModel.findOne({ name: name });

        if (existingProduct) {
          // If the product already exists in the database, send a response indicating that it is a duplicate entry
          return res.status(409).send({ message: "meat already exists" });
        }else{
        const meat=new MeatModel(req.body)
        await meat.save()
        res.status(200).send({"msg":"New meat added"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":err})
    }
})

//read meats
meatsRoute.get('/',async(req,res)=>{
    // const query=req.query
    try{
        const meats=await MeatModel.find()
        res.send(meats)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

//update meat
meatsRoute.patch('/update/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await MeatModel.findByIdAndUpdate({_id:Id},req.body)
            res.status(200).send("meat has ben updated")
    } catch (err) {
        console.log(err)
    }
})
//delete meat
meatsRoute.delete('/delete/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await MeatModel.findByIdAndDelete({_id:Id})
            res.status(200).send("meat has ben deleted")
    } catch (err) {
        console.log(err)
        res.send("something wrong")
    }
})
module.exports={meatsRoute}
