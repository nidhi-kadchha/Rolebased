const express = require('express');
const router = express.Router();
const usermodel = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



router.get('/', function(req,res)
{
    res.render("register");
});

router.post('/', async (req,res,next) =>
{
    const name = req.body.username;
    const ps = req.body.password;
    const ro = req.body.role;

    usermodel.findOne({username:name},function(err,ouser)
    {
        if(err)
        {
            console.log(err);
        }
        else if(ouser)
        {
            console.log("user already exist");
        }
        else
        {
            
            var ad;
            if(ro === "admin"){ad=true;}
            else{ad=false;} 
            const salt = 10;
            let hash = bcrypt.hashSync(ps,salt)
            const newdata = usermodel({username:name,password:hash,role:ro,admin:ad});   
            newdata.save();
              
            //const token = newdata.genrateauthtoken();
            
        }
    })
})

module.exports = router;