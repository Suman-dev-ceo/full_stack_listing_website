const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
// const users = require('./routes/users.js');
// const posts = require('./routes/posts.js');
// const cookieParser = require('cookie-parser');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));



const sessionObjects = {
    secret : 'mysupersecretstring', 
    resave : false, 
    saveUninitialized : true
};

app.use(session(sessionObjects));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    next();
});

app.get('/register',(req,res)=>{ //pass name as query string ?name=suman
    let {name = 'anonymous'} = req.query;
    req.session.name = name;
    if(name === 'anonymous'){
        req.flash('error','user not registered');
    } else {
        req.flash('success','user registered successfully');
    }
    res.redirect('/hello');
     
});

app.get('/hello',(req,res)=>{
    res.render('page.ejs',{name : req.session.name});   
});

// app.get('/test',(req,res)=>{
//     res.send('test successful');
// });

// app.get('/reqcount',(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });

app.listen('3000',(req,res)=>{
    console.log('app is listening to port : 3000');
});


// app.use(cookieParser('secretcode'));

// app.get('/getcookies',(req,res)=>{
//     res.cookie('greet','namaste');
//     res.cookie('madeIn','India');
//     res.send('we send you a cookie!');
// });

// app.get('/getsignedcookie',(req,res)=>{
//     res.cookie('made-in','India',{signed : true});
//     res.send('signed cookie');
// });

// app.get('/verify',(req,res)=>{
//     // console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send('verified');
// });

// app.get('/',(req,res)=>{
//     console.dir(req.cookies);
//     res.send('I am root');
// });

// app.get('/greet',(req,res)=>{
//     let {name = 'anynomous'} = req.cookies;
//     res.send(`Hi,${name}`);
// });

// app.use('/users',users);
// app.use('/posts',posts);