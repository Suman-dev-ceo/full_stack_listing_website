const express = require('express');
const router = express.Router();

//Users
//Index users
router.get('/',(req,res)=>{
    res.send('GET for users');
});

//Show users
router.get('/:id',(req,res)=>{
    res.send('GET for show users');
});

//POST users
router.post('/',(req,res)=>{
    res.send('POST for users');
});

//Delete users
router.delete('/:id',(req,res)=>{
    res.send('DELETE for user id');
});

module.exports = router;