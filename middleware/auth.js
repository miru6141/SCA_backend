     import jwt from 'jsonwebtoken';
     import userModel from '../modals/usermodel.js';
     import cookieParser from 'cookie-parser';
    import ErrorHandler from '../utils/ErrorHandler.js';
   
   
   export const isAuthenticated= async(req,res,next)=>{

        const {Ctoken}= req.cookies;
        console.log("Token received from cookie:", Ctoken);

        if (!Ctoken) {
            return res.status(401).json({ 
                message: 'No token provided' 
               
            
            
            });
           
        }
       

        const decoded= jwt.verify(Ctoken,'shhhhhh');

        req.user= await userModel.findById(decoded.id);

        if (!req.user) {
            console.log('User not found'); // Debugging statement
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    }


    
export const AuthorizeAdmin= (req,res,next)=>{

   // if(req.body==='')
      //return next(new ErrorHandler("unauthorized Access ",403));

     next();

    
}