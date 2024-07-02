import mongoose from 'mongoose';


import fs from 'fs';



const fileSchema=mongoose.Schema({

    profilepic:String,
   
})

export default mongoose.model("file",fileSchema);