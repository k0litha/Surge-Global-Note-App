const UserModel = require("../Models/UserModel");

const.create


module.exports.admin = async( req, res, next) => {};
module.exports.login = async( req, res, next) => {
    try {
        const {email,password} = req.body;
        const user = await UserModel.create({email,password});
        
    } catch (error) {
        
    }


};