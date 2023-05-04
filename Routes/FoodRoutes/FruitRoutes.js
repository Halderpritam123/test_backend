const express=require('express')
const { FruitModel } = require('../../Model/FoodModel/FruitModel')
const fruitsRoute=express.Router()
fruitsRoute.get('/',(req,res)=>{
    res.status(200).send({"msg":"Home Page"})
})
// create fruits 
fruitsRoute.post('/add',async(req,res)=>{
    const name = req.body.name;
    try{
        const existingProduct = await FruitModel.findOne({ name: name });

        if (existingProduct) {
          // If the product already exists in the database, send a response indicating that it is a duplicate entry
          return res.status(409).send({ message: "fruit already exists" });
        }else{
        const fruit=new FruitModel(req.body)
        await fruit.save()
        res.status(200).send({"msg":"New fruit added"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":err})
    }
})

//read fruits
fruitsRoute.get('/',async(req,res)=>{
    // const query=req.query
    try{
        const fruits=await FruitModel.find()
        res.send(fruits)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

//update fruit
fruitsRoute.patch('/update/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await FruitModel.findByIdAndUpdate({_id:Id},req.body)
            res.status(200).send("fruit has ben updated")
    } catch (err) {
        console.log(err)
    }
})
//delete fruit
fruitsRoute.delete('/delete/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await FruitModel.findByIdAndDelete({_id:Id})
            res.status(200).send("fruit has ben deleted")
    } catch (err) {
        console.log(err)
        res.send("something wrong")
    }
})
module.exports={fruitsRoute}
