import express from "express";

import{createUser,getUsersByName}from "../helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=express.Router();

async function genPassword(password){
  //bcrypt.genSalt(No Of Rounds)
     const salt=await bcrypt.genSalt(10)
     const hashPassword=await bcrypt.hash(password,salt);//salt+password@123
    console.log({salt,hashPassword});
    return hashPassword;
   } 
      router.post('/signup', async function (request, response) {
  
      const {username,password}=request.body;
      const hashPassword=await genPassword(password);
      const newuser={
        username:username,
        password:hashPassword
      }
      const result=await createUser(newuser);
      response.send(result);
    })
    router.post('/login', async function (request, response) {
  
      const {username,password}=request.body;
      const userFromDB=await getUsersByName(username)

     //db.users.findOne({username:"tamil"})
     console.log(userFromDB);
     if(!userFromDB){
       response.status(401).send({message:"Invalid Credentials"})
     }else{
       const storedPassword=userFromDB.password//hashedpassword
       const isPasswordMatch=await bcrypt.compare(password,storedPassword)
       console.log("isPasswordMatch",isPasswordMatch);
       if(isPasswordMatch){
         const token=jwt.sign({id:userFromDB._id_id},process.env.SECRET_KEY)
         response.send({message:"successfull login",token:token});
       }
      else{
        response.status(401).send({message:"Invalid Credentials"})
      }
      }
     
    })
    export const usersRouter=router;