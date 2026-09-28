const CatchError =(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next({message:err.message || "internal server error",});
        });
    };
}

export default CatchError;