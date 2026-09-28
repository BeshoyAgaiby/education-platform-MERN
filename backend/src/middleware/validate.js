const validate =(schema)=>{
   return(req,res,next)=>{
    let {error}= schema.validate({...req.body,...req.params,...req.query},{abortEarly:false});
     if(error){
        return res.status(400).json({message:"Validation error", details:error.details.map(d => d.message)})
    }else{
    next();
    }
    
   }
}

export default validate;