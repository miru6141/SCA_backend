

import mongoose from 'mongoose';
import fs from 'fs';



const userSchema=mongoose.Schema({

    firstName:String,
    lastName:String,
    phone:Number,
    profilepic:{
        type:String,
        
    },
    dob:Date,
    email:String,
    password:String,

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