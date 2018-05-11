// const db = require('./db');
const express = require('express');
const Router = express.Router();
// const welcome = require('../controllers/welcome');
const userModel = require('./userModel');
Router.get('/list',function(req,res){
    userModel.getByNamePwd(function(rs){
        console.log(rs);
        return res.json(rs);
    })
});//test
Router.get('/info',function(req,res){
    //此处做Cookie的校验
    return res.json({code:1})
})

module.exports = Router
//相当于Controller了