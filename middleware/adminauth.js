const jwt = require('jsonwebtoken');
const usermodel = require("../models/user");

const auth_admin = async function(req,res,next)
{
    try
    {
        const token = req.cookies.auth;
        const verifyuser = jwt.verify(token,"01234567890123456789012345678901");
        const user = await usermodel.findOne({_id:verifyuser._id});
        if(user.admin === false)
        {
            res.send("you are not authorized to access page");
            
        }
        req.token = token;
        req.user = user;
    }
    catch(err)
    {
        res.redirect("login")
    }
}

module.exports = auth_admin;