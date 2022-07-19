const cookieparser  = require('cookie-parser');
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const app = express();
app.use(cookieparser());



router.get('/',function(req,res)
{
    res.render("secrets");
    console.log(req.cookies.auth);
    
});

module.exports = router;