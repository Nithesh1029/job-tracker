import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword =await bcrypt.hash(password,10);
    const user=await User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword
    });
    
    return res.status(201).json({message:"User created successfully",user});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
};



export const login =async(req ,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"all fields required"});
        }
        const userCheck=await User.findOne({email}).select(" _id password");
        if(!userCheck){
            return res.status(400).json({message:"user doesn't exists"});
        }
        
        const passwordCheck=await bcrypt.compare(password,userCheck.password);
        if(!passwordCheck){
            return res.status(400).json({message:"invalid password"});

        }

        const token = jwt.sign({id:userCheck._id},process.env.SECRET_TEXT,{expiresIn:'1h'});
        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:'strict',
            maxAge:3600000
        });

        res.status(200).json({message:"Logged in successfully"});

    } catch (error) {
        return res.status(500).json({message:error.message}); 
    }
}