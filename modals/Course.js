      import mongoose from 'mongoose';




      const CourseSchema=mongoose.Schema({

         title:{
            type:String,
            required:[true,"please enter course title"],
            minLength:[4,'Title must be atleast Four character'],
            maxLength:[50,'Title can not exceed 50 Character']
         },
         
         description:{
            type:String,
            required:[true,"please enter course title"],
            minLength:[10,'Discription must be atleast 10 character'],
          
         },

        lecture:[
         {
              title:{
               type:String,
              // required:true
              }
              ,
              description:{
               type:String,
               required:true
              },
              video:{
                   public_id:{
                     type:String,
                     required:true
                   },
                   url:{
                     type:String,
                    required:true
                   }

              }
         }
        ],

        poster:{
         public_id:{
           type:String,
           required:true
         },
         url:{
           type:String,
           required:true
         }

    },
       views:{
         type:Number,
         default:0
       },
       NumberofVideos:{
         type:Number,
         default:0
       },
       category:{
           type:String,
           required:true
       },
       createdBy:{
         type:String,
         required:[true,'Enter course creater Name']
       },
       createAt:{
         type:Date,
         default:Date.now()

       }

      })

      export default mongoose.model('course',CourseSchema);