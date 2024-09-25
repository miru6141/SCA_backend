import bcrypt from'bcrypt';
import cookieParser from'cookie-parser';
import jwt from 'jsonwebtoken';
import userModel from '../modals/usermodel.js';
import Course from '../modals/Course.js';
import ErrorHandler from  '../utils/ErrorHandler.js'
import { catchError } from '../middleware/catchError.js';
import  dotenv from 'dotenv';

dotenv.config({
    path:"\.env"
  })

export const registerUser=async(req,res)=>{

    const Tokensecret=process.env.TOKEN_SECRET

    let {firstName,lastName,phone,dob,email,password,role}=req.body;

    const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

    bcrypt.genSalt(10,function (err,salt){

        bcrypt.hash(password,salt,async function(err,hash){

            let userCreated=await userModel.create({
                firstName,
                lastName,
                phone,
                dob,
                email,
                role,
                password:hash
                
            })
                  let token=jwt.sign({email},'shhhhhh')
            res.cookie("token",token);
            res.json(userCreated);

        })
    })

   
     
   
}

export const loginUser=async(req,res)=>{
      
      const{email,password}=req.body

    let user= await userModel.findOne({email})

    if(!user) return res.status(400).json({message:'email or password is invaild'});

    bcrypt.compare(password,user.password,function(err,result){   
        
        
        
       let token=jwt.sign({ id: user._id },'shhhhhh')
       res.cookie("token",token,{ maxAge: 900000, httpOnly: true, path: '/', secure: true,
        sameSite: 'None',});
      
        if(result){
            res.json({ user: user, token: token });
          
        }
        else{
            res.json("email or password in invalide")
        }
    })

    //console.log(req.body);
   // res.send(req.body)

}


export const logoutUser =async (req, res) => {
      
    res.clearCookie('token');
                            // Assuming 'connect.sid' is the session cookie name
    res.sendStatus(200);

}

export const addtoPlaylist=  catchError( async(req,res,next)=>{
         
       const user= await userModel.findById(req.user._id);
       if(!user)  return next (new ErrorHandler("Invalid  user",404))

       const course=await Course.findById(req.body.id);
         if(!course) return next (new ErrorHandler("Invalid course id",404));



         const itemExits= user.playList.find((item)=> {
           if( item.course.toString()===course.id.toString()) return true
         })

         if(itemExits) return next(new ErrorHandler("item Already exits",409));
        

       user.playList.push({
         course:course._id,
         poster:course.poster.url,

       })
       await user.save();

       res.status(200).json({
        success:true,
        message:"added to playList successfully"
      })




})
  
 export const removeFromPlayList =  catchError(async(req,res,next)=>{

        const user= await userModel.findById(req.user._id)
        if(!user) return next(new ErrorHandler("user not found",409));

        const course=await Course.findById(req.body.id);
        if(!course) return next(new ErrorHandler("course Id is not valid",409));

        const newPlayList= user.playList.filter((item)=>{
           if(item.course.toString()!==course.id.toString()) return item;
        })

        user.playList=newPlayList
        user.save();

        
       res.status(200).json({
        success:true,
        message:" remove from playList successfully"
      })

  })
   