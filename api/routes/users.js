const User = require("../models/User.js")
const express = require("express")
const router = express.Router()


// ! Read
router.get("/get-all",async (req,res) => {
    try{
        const Users = await User.find();
        // res.send(bills)
        res.status(200).json(Users)
    }
    catch(error){
        res.status(400).json(error)
    }
})
// ! get a user
router.get("/",async (req,res) => {
    const userId = req.body.userId
    try{       
        const user = await User.findById(userId)
        res.status(200).json(user)

       
    }
    catch(error){
        res.status(400).json(error)
    }
})




module.exports = router;