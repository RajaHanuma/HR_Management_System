const userSchema = require('../model/userModel');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = process.env;
const ObjectId = mongoose.Types.ObjectId;
const { sendEmail } = require("../utility/sendEmail");
const { generateOTP } = require("../utility/utility");


exports.addUser = async function (req, res) {
    try{
        let userData = req.body;
        let userId = req.body._id;
        if(userId){
            //delete req.body._id;
           let response = await userSchema.updateOne(
                {"_id": ObjectId(userId)},
                {"$set": req.body}
            );
            console.log(response);
            res.status(200).json({data: response, message: "User updated successfully"});
        }else{
            let user = new userSchema(userData);
            let response = await user.save();
            res.status(200).json({data: response, message: "User added successfully"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: error, message: "Invalid data"});
    }
}

exports.getUser = async(req, res) => {
    console.log("in controller ",req.user)
    let userList = await userSchema.find();
    res.status(200).json(userList);
}

exports.login = async function (req, res) {
    try{
        console.log(req.body);
        let userRes = await userSchema.findOne({email: req.body.email, password: req.body.password});
        console.log(userRes);
        if(userRes){
            let token = jwt.sign({email:userRes.email,id:userRes._id}, config.JWT_SECRET_KEY);
            res.status(200).json({data:userRes, token, message: "User login successfully"});
        }
        else{
            res.status(401).json({message: "Enter correct Username and Password"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: error, message: "Invalid data"});
    }
}

exports.getUserById = async function(req, res) {
    console.log("in controller getUserById",req.params.id)
    let userList = await userSchema.findOne({"_id": ObjectId(req.params.id) });
    res.status(200).json(userList);
}

exports.getCurrentUser = async function(req, res) {
    try{
        console.log("hiii")
        let userList = await userSchema.findOne({"_id": ObjectId(req.user.id) });
        res.status(200).json(userList);
    } catch(error){
        res.status(400).json({message:"Object not found"});
    }
}

exports.getUserByMail = async function(req, res){
    try{
        let userList = await userSchema.findOne({email: req.body.email});
        res.status(200).json(userList);
    }
    catch(error){
        res.status(400).json({message: "User not found"});
    }
}

exports.verifyOTP = async function(req, res){
    try{
        let userList = await userSchema.findOne({email: req.body.email, otp: req.body.otp});
        if(userList){
            res.status(200).json(userList);
        }
        else{
            res.status(400).json({message: "User not found"});
        }
    }
    catch(error){
        res.status(400).json({message: "User not found"});
    }
}

exports.checkMail = async function(req, res){
    try{
        console.log(req.body.email);
        let userMail = await userSchema.findOne({email: req.body.email});
        console.log("userMail is", userMail);
        if(userMail){
            const otpGenerator = generateOTP();
            let response = await userSchema.updateOne(
                {"email": req.body.email},
                {"$set": {otp: otpGenerator}}
            );
            console.log("newUser is", response);
            await sendEmail({email:req.body.email, otp: otpGenerator});
            res.status(200).json({data:userMail, message: "User entered correct mail id"});
        }
        else{
            res.status(400).json({message: "Enter correct mail is"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: error, message: "Invalid data"});
    }
}