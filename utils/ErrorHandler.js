   
      class ErrorHandler extends Error {
         
          constructor(message,StatusCode){
            super(message)

            this.StatusCode=StatusCode;
          }

      }

      export default ErrorHandler;