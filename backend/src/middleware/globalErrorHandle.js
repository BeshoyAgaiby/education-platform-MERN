const globalErrorHandle=(err,req,res,next)=>{
   let error = err.message;
   let code = err.statusCode || 500

   res.status(code).json({ error});
}

export default globalErrorHandle;