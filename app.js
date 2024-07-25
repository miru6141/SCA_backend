import express from 'express';
import mongoose from'mongoose';

import cors from 'cors';
import bodyParser from'body-parser'
import bcrypt from'bcrypt';
import cookieParser from'cookie-parser';
import jwt from 'jsonwebtoken';
import filemodel from'./modals/filemodel.js';
import userModel from './modals/usermodel.js';
import path from 'path';
//const videofile=require('./modals/videomodal')
import upload from './middleware/multer.js';
import Course from './routes/courseRouter.js';
import  register  from './routes/courseRouter.js';
import { profilepic } from './controller/uplodeprofilepic.js';
import { ErrrorMiddleware } from './middleware/Error.js';
import  dotenv from 'dotenv';


import {v2 as cloudinary} from 'cloudinary';
          



dotenv.config({
    path:"../.env"
})
const PORT =process.env.PORT || 3000
const DB_URL=process.env.DB_URL||'mongodb://127.0.0.1:27017/E-learning'
//const originconfig=process.env.ORIGIN || 'http://localhost:5173'

const app=express();
app.use(express.json());
app.use(cors(
    {
        origin: 'https://mysca.netlify.app',
        credentials: true
    }
))
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.use('/upload', express.static(path.join(__dirname, '../public/temp')));


mongoose.connect(DB_URL);

app.use('/api/v1',Course);
app.use('/api/v1/',register);
app.use('/api/v1',profilepic)
//app.use('/api/v1/',)



app.use(ErrrorMiddleware)
console.log(process.env.CLOUD_NAME)


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SCERET
});

   
     
   








/*app.post('/Admin',async(req,res)=>{

    let {videoTitle,videoDescription,courseTitle}=req.body;

     let createdPlayList=new videofile({
        videoTitle,
        videoDescription,
        courseTitle


     })

        res.json(createdPlayList);
        createdPlayList.save();

       

})*/











app.get('/read',async(req,res)=>{
    let readuser=await userModel.find();

    res.send(readuser);
})
 



app.listen(PORT);