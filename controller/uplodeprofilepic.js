
import filemodel from "../modals/filemodel.js";
import fs from 'fs'
import multer from "multer";

export const profilepic=async(req,res)=>{

   
    let userfile=new filemodel({
       // profilepic:req.file.filename,
        user:req.body,
    })
    let createdfile=await userfile.save();

    res.json(createdfile);  
    
}

