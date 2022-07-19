const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const db = require("../database/db");

const userschema = mongoose.Schema({
    username:String,
    password:String,
    role:String,
    admin:Boolean,
    tokens:[{token:{type:String}}]
});

userschema.methods.genrateauthtoken = async function()
{
    try
    {
        const newtoken = jwt.sign({_id:this._id.toString()},"01234567890123456789012345678901");
        
        this.tokens = this.tokens.concat({token:newtoken})
        await this.save();
        return newtoken;
    
    }
    catch(err)
    {
        console.log(err);
    }
}

const usermodel = mongoose.model('usermodel',userschema,'user');
module.exports = usermodel;