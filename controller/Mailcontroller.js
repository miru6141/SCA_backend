import { catchError } from "../middleware/catchError.js";
import Mailmodal from "../modals/sendmail.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import  nodemailer  from 'nodemailer';
import Mailgen from 'mailgen';
import path from 'path';
import  dotenv from 'dotenv';



dotenv.config({
  path:"\.env"
})

 // const gmail= process.env.GMAIL_USER
 // console.log(gmail)

export const Mailsended= catchError(async(req,res,next)=>{

 
  

    const {name,email,phone,message}= req.body;

           const mail= await Mailmodal.create({

             name,
             email,
             phone,
             message


           })
              if(!mail) return next(new ErrorHandler('mail not create',400))

                await sendReferralEmail(mail, res);

                
            res.status(200).json({
                success:true,
                mail,
                message:'mail sent successfully'

            })
})

async function sendReferralEmail(referral, res) {
  const { GMAIL_USER, GMAIL_PASS } = process.env;

 // console.log(GMAIL_PASS) 
  
  let config = {
      service: 'gmail',
      auth: {
          user: GMAIL_USER,
          pass: GMAIL_PASS
      }
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product: {
          name: "Referral",
          link: 'https://mailgen.js/'
      }
  });

  let response = {
      body: {
          name: `Hi ${referral.name}`,
          intro: `${referral.message}`,
          table: {
              data: [
                  {
                      item: "Javascript Book",
                      description: "A Book to help learn javascript programming",
                      price: " 40% off if you using this refral id",
                      Referral_id:`${referral.name}40`,
                      email:`${referral.email}`,

                    
                  }
              ]
          },
          outro: "Looking forward to do more business"
      }
  };

  let mail = MailGenerator.generate(response);

  let message = {
      from: GMAIL_USER,
      to: "miru6141@gmail.com",
      subject: "Referral Course",
      html: mail
  };

  try {
      await transporter.sendMail(message);
      console.log("Email sent successfully.");
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: 'Failed to send email' });
  }
}



      

