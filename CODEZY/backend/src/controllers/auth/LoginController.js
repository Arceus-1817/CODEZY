import Sample_test from '../../models/Sample_test.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const registerUser = async(req , res)=>{
    const {username, email, password}=req.body;
   try
    {const isExist= await Sample_test.findOne({email});
    if(isExist){
        return res.status(400).json({message:'user exist'})
    }
    const salt= await bcrypt.genSalt(10);
    console.log('salt-',salt);
    const hashedPassword= await bcrypt.hash(password,salt);
    const user=new Sample_test({
        username,
        email,
        password:hashedPassword
    })
    await user.save();
    res.status(200).json(
        {
            user,
            message:"user registered"
        }
    );}
    catch(err){
        console.error('error-',err)
        res.status(500).json({message:'server error'})
    }


}
const loginUser = async (req, res)=>{
    const {email,password}=req.body;
    console.log('email-',email)
    console.log('password ',password)
    const user_exist= await Sample_test.findOne({email});
    if(!user_exist){
        return res.status(400).json({message:"user doesnt exits"});
    }
    console.log('user-',user_exist.password)
    const isMatch=await bcrypt.compare(password,user_exist.password);
    if(!isMatch){
        return res.status(400).json({message:"invalid password"});
    }
    const user={
        username:user_exist.username,
        email:email,
    }
    const token= jwt.sign(
        {userId:user_exist._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );
    res.status(200).json({
        user,
        token,
        message:"login successfully"
    })

}
const getName = async (req, res)=>{
    const userId= req.user.userId;
    let user=null;
    try{
         user = await Sample_test.findById(userId);
    }
    catch(err){
        console.error('error-',err)
        return res.status(500).json({message:'server error'})
    }
    res.status(200).json(user.username);   
}
export default {registerUser,loginUser, getName};