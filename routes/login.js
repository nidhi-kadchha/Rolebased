const express = require('express');
//const cookieparser = require('cookie-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usermodel = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require('bcrypt');

router.get('/',function(req,res)
{
    res.render("login");
});
/*
router.post('/',function(req,res)
{
    const token = jwt.sign({_id:usermodel._id},"0123456789012345678901234568901");
    //newdata.token=token;
    res.cookie("login",token,{expires:new Date(Date.now() + 25892000000),httpOnly:true});
})
*/

router.post('/',function(req,res)
{
    const name = req.body.username;
    const ps = req.body.password;
    const ro = req.body.role;
    
    usermodel.findOne({username:name},function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
        else if(user)
        {
           
            bcrypt.compare(ps,user.password,function(err,result)
            {
                if(err){console.log(err);}
                else if(result)
                {
                    usermodel.findOne({role:ro},function(err,authuser)
                    {
                        if(err){console.log(err);}
                        else if(authuser)
                        {
                            const token = authuser.genrateauthtoken();
                            res.cookie("auth",token,{maxAge:9000000,httpOnly:true});                          
                            res.render("secrets")
                            console.log(req.cookies.auth);
                        }
                        else{console.log("invalid role");}
                    })
                }
                else
                {
                    console.log("invalid");
                }
            })
                    
        }
        else
        {
            console.log("No such user Exist");
        }
    })
})
module.exports = router;