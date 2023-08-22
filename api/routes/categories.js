const Category = require("../models/Category.js")
const express = require("express")
const router = express.Router()


// ! Read
router.get("/get-all",async (req,res) => {
    try{
        const categories = await Category.find();
        // res.send(categories)
        res.status(200).json(categories)
    }
    catch(error){
        res.status(400).json(error)
    }
})


// ! Create
router.post("/add-category",async(req,res) => {
    try{
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Item is added successfully")
    } catch(error){
        res.status(400).json(error)
    }
});


// ! Update
router.put("/update-category",async (req,res) => {
    try{
        await Category.findOneAndUpdate({_id: req.body._id}, req.body)
        res.status(200).json("Item is updated")
    }
    catch(error){
        res.status(400).json(error)
    }
})


// ! Delete
router.delete("/delete-category",async (req,res) => {
    try{
        await Category.findOneAndDelete({_id: req.body._id})
        res.status(200).json("Item is deleted successfully")
    }
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = router;