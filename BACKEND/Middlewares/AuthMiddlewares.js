const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req,res,next) =>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_KEY, async(err,decodedToken) =>{
            if(err){return res.status(403).json({ status: false })}
                next();
            });

    }else{
        res.status(401).json({ status: false });    
    }
}




module.exports.checkAdmin = (req,res,next) =>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_KEY, async(err,decodedToken) =>{
            if(err){
                return res.status(403).json({ status: false })}
            else if(decodedToken.accountType !=='admin'  && !decodedToken.stat){
                return res.status(403).json({ status: false })}               
                next();
            });
    }else{
        res.status(401).json({ status: false });  
    }
}

module.exports.checkStudent = (req,res,next) =>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_KEY, async(err,decodedToken) =>{
            if(err){
                return res.status(403).json({ status: false })}
            else if(decodedToken.accountType !=='student' && !decodedToken.stat){
                return res.status(403).json({ status: false })}
                next();
            });
    }else{
        res.status(401).json({ status: false });  
    }
}