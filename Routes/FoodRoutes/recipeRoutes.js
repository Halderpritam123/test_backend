const express=require('express')
const { RecipeModel } = require('../../Model/FoodModel/recipeModel')
const recipesRoute=express.Router()
// create recipes 
recipesRoute.post('/add',async(req,res)=>{
    const name = req.body.name;
    try{
        const existingProduct = await RecipeModel.findOne({ name: name });

        if (existingProduct) {
          // If the product already exists in the database, send a response indicating that it is a duplicate entry
          return res.status(409).send({ message: "recipe already exists" });
        }else{
        const recipe=new RecipeModel(req.body)
        await recipe.save()
        res.status(200).send({"msg":"New recipe added"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({"msg":err})
    }
})

//read recipes
recipesRoute.get('/',async(req,res)=>{
    // const query=req.query
    try{
        const recipes=await RecipeModel.find()
        res.send(recipes)
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

//update recipes
recipesRoute.patch('/update/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await RecipeModel.findByIdAndUpdate({_id:Id},req.body)
            res.status(200).send("recipe has ben updated")
    } catch (err) {
        console.log(err)
    }
})
//delete recipe
recipesRoute.delete('/delete/:Id',async(req,res)=>{
    const {Id}=req.params
    try {
            await RecipeModel.findByIdAndDelete({_id:Id})
            res.status(200).send("recipe has ben deleted")
    } catch (err) {
        console.log(err)
        res.send("something wrong")
    }
})
module.exports={recipesRoute}
