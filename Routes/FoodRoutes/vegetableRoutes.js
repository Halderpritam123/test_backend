const express=require('express')
const { VegetableModel } = require('../../Model/FoodModel/vegetableModel')
const vegetableRoute=express.Router()
// create vegetable 
vegetableRoute.post('/add',async(req,res)=>{
    const name = req.body.name;
    try{
        const existingProduct = await VegetableModel.findOne({ name: name });

        if (existingProduct) {
          // If the product already exists in the database, send a response indicating that it is a duplicate entry
          return res.status(409).send({ message: "vegetable already exists" });
        }else{
         vegetable=new VegetableModel(req.body)
        await vegetable.save()
        res.status(200).send({"msg":"New vegetable added"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":err})
    }
})

//read vegetables
vegetableRoute.get('/',async(req,res)=>{
    // const query=req.query
    try{
        const vegetables=await VegetableModel.find()
        res.send(vegetables)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})
//update vegetable
vegetableRoute.patch('/update/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await VegetableModel.findByIdAndUpdate({_id:Id},req.body)
            res.status(200).send("vegetable has ben updated")
    } catch (err) {
        console.log(err)
    }
})
//delete vegetable
vegetableRoute.delete('/delete/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await VegetableModel.findByIdAndDelete({_id:Id})
            res.status(200).send("vegetable has ben deleted")
    } catch (err) {
        console.log(err)
        res.send("something wrong")
    }
})
module.exports={vegetableRoute}
