 export const ErrrorMiddleware=(err,req,res,next)=>{
            
          err.StatusCode=err.StatusCode || 500
          err.message=err.message || "Internal server Error "
      res.status(err.StatusCode).json({
          
        success:false,
        message:err.message

      })
      
     


 }