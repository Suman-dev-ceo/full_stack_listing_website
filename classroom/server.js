const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');

app.get('/getcookies',(req,res)=>{
    res.cookie('greet','namaste');
    res.cookie('madeIn','India');
    res.send('we send you a cookie!');
});

app.get('/',(req,res)=>{
    res.send('I am root');
});

app.use('/users',users);
app.use('/posts',posts);

app.listen('3000',(req,res)=>{
    console.log('app is listening to port : 3000');
});


