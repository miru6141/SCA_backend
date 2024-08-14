

import mongoose from 'mongoose';
import fs from 'fs';



const userSchema=mongoose.Schema({

    firstName:
    {
     type: String,
    required:[true,' Please Enter Your Name '],
    },
    lastName: {
        type: String,
       required:[true,' Please Enter Your Name '],
       },
    phone: {
        type: Number,
       required:[true,' Please Enter Your Name '],
       },
   
    profilepic:{
        type:String,
        
    },
    dob:Date,
    email: {
        type: String,
       required:[true,' Please Enter Your Name '],
       },
    password: {
        type: String,
       required:[true,' Please Enter Your Name '],
       },

    role:{
        type:String
    },

    playList:
    [
    {
        course:{
            type:mongoose.Schema.ObjectId,
            ref:'Course',
        },
        poster:String,
    }
   
    ],
    cretedAt:{
        type:Date,
        default:Date.now
    }
    

    
})



export default mongoose.model('user',userSchema);