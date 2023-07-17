const express = require("express")
const userRouter = express.Router()
const { UserModel } = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const app = express()

userRouter.post("/register", async(req, res)=> {
    const { username, email } = req.body
    try {
        //Check User Exist or Not
        const userExist = await UserModel.findOne({ email })
        if(userExist){
            return res.status(400).json({ message : 'User Already Exists, Please Login.' })
        }

        //Register new user
        const user = new UserModel({ username, email })
        await user.save()
        res.status(201).json({ message : 'Register Successful' })
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})



module.exports = { userRouter }