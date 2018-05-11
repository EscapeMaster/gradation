// const db = require('./db');
const express = require('express');
const Router = express.Router();
// const welcome = require('../controllers/welcome');
const user = require('./userModel');
Router.get('/list',user.getByNamePwd);
Router.get('/info',function(req,res){
    //此处做Cookie的校验
    return res.json({code:0})
})

module.exports = Router