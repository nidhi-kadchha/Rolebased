const express = require('express');
const cookieparser  = require('cookie-parser');
const app = express();

//setting default engine
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

//routers
const home_r = require("../auth/routes/home");
app.use('/',home_r);
const register_r = require("../auth/routes/register");
app.use('/register',register_r);
const login_r = require("../auth/routes/login");
app.use('/login',login_r);
const secret_r = require("./routes/secrets");
app.use('/secrets',secret_r);
const admin_secret_r = require("./routes/admin");
app.use('/admin',admin_secret_r);

//server
app.listen('3000', () => {console.log("Server : 3000");})