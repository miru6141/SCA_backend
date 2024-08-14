import mongoose from 'mongoose';


import fs from 'fs';
//import { profilepic } from '../controller/uplodeprofilepic';



const fileSchema=mongoose.Schema({

 

    profilepic:{
        public_id:{
          type:String,
         
        },
        url:{
          type:String,
         
        }
    },
   
})

export default mongoose.model("filemodal",fileSchema);