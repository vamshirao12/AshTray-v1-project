module.exports=(err,req,res,next)=>{console.error(err);const status=err.statusCode||500;res.status(status).json({success:false,message:status===500?"Internal server error":err.message});};
