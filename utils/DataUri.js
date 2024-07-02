  
     import DataUriParser from 'datauri/parser.js'
     
     import path  from 'path'    
      
    
     const getDataUri= (file) =>{
        const parser=new DataUriParser();

        const ExtName= path.extname(file.originalname).toString();

        return parser.format(ExtName,file.buffer).content;
     }

     export default getDataUri