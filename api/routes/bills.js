const Bill = require("../models/Bill.js")
const express = require("express")
const router = express.Router()


// ! Read
router.get("/get-all",async (req,res) => {
    try{
        const bills = await Bill.find();
        // res.send(bills)
        res.status(200).json(bills)
    }
    catch(error){
        res.status(400).json(error)
    }
})


// ! Create
router.post("/add-bill",async(req,res) => {
    try{
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(200).json("Item is added successfully")
    } catch(error){
        res.status(400).json(error)
    }
});

module.exports = router;