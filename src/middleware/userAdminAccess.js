exports.isAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        res.status(400).json({message: 'User Access denied'})
    }
    next()
}
exports.isUser = (req,res,next)=>{
    if(req.user.role !== 'user'){
        console.log(req.user.role,"fvgbhn");
        res.status(400).json({message: 'Admin Access denied'})
    }
    next()
}