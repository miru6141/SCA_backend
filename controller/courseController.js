 import { catchError } from "../middleware/catchError.js";
import Course from "../modals/Course.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/DataUri.js";
import { v2 as cloudinary } from "cloudinary";
//import { profilepic } from "./uplodeprofilepic.js";




export const getAllCourses=   catchError(async (req,res,next)=>{

      const courses= await Course.find().select('-lecture');

      res.status(200).json({
        success:true,
        courses
      })

})




export const createCourse= catchError(async(req,res,next)=>{

       const {title,description,category,createdBy,price}=req.body;

       const file=req.file;
       const fileUri=getDataUri(file);
       
     
     
        const myCloud= await cloudinary.uploader.upload(fileUri)
        if(!myCloud) return next(new ErrorHandler('cloudinary Error',500));

      const courseCreated= await Course.create({
             
            title,
            description,
            category,
            createdBy,
            price,
            poster:{
              public_id:myCloud.public_id,
              url:myCloud.secure_url

            }

            
          

      })
      if(!courseCreated) return next(new ErrorHandler("invalid course id ",409))


       
      
      res.status(200).json({
        success:true,
        courseCreated,
        message:"course created successfully"
      })

     
})

 
export const getCourseLecture= catchError(async(req,res,next)=>{

  const course= await Course.findById(req.params.id);
  if(!course) return next(new ErrorHandler('course id not invalid',409));
   
  course.views+=1;
  await course.save();
   
  res.status(200).json({
   success:true,
   lecture:course.lecture,
 })


})

export const addLecture= catchError(async(req,res,next)=>{


  const {title,description}=req.body;
     const course=await Course.findById(req.params.id);
   

     const file=req.file;
     const fileUri=getDataUri(file);
        
   
      const myCloud= await cloudinary.uploader.upload(fileUri,{
        resource_type:'video'
      })
      
      if(!myCloud) return next(new ErrorHandler('cloudinary Error',500));

         course.lecture.push({

         title,
         description,
         video:{
          public_id:myCloud.public_id,
          url:myCloud.secure_url
         }

         })

         await course.save();
      res.status(200).json({
       success:true,
       message:"Lecture Added Successfully"

      })
})
     
export const deleteCourse= catchError(async(req,res,next)=>{
    
   console.log(req.params.id);
     const course= await Course.findById(req.params.id);
     if(!course) return next(new ErrorHandler('invalid course id',403));

     await cloudinary.uploader.destroy(course.poster.public_id);
     console.log(course.poster.public_id)
     for(let i=0;i<course.lecture.length;i++)
      {
            const singleLecture= course.lecture[i];

            await cloudinary.uploader.destroy(singleLecture.video.public_id,{
              resource_type:"video"
            });
            console.log(singleLecture.video.public_id)

      
      }
       //   await Course.findByIdAndDelete(req.params.id);
      
    
        await course.save();



     res.status(200).json({
       success:true,
       message:"Course Deleted Successfully"

     })



})

  export const deleteLecture= catchError(async(req,res,next)=>{
                  
            const {courseId,lectureId} = req.query;

            const course= await Course.findById(courseId);
            if(!course)  return next(new ErrorHandler("course not found",404));
             
            const getlecture = course.lecture.find((item)=>{

              if(item._id.toString()=== lectureId.toString()) return item
            })

            await cloudinary.uploader.destroy(getlecture.video.public_id,{
              resource_type: "video"
            });

            
          const lecture= course.lecture.filter((item)=>{

              if(item._id.toString()!== lectureId.toString()) return item
            })


            res.status(200).json({
              success:true,
              message:"lecture deleted successfully"
            })

  })