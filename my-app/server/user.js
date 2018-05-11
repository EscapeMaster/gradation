const utils = require('utility')
const express = require('express');
const Router = express.Router();
// const welcome = require('../controllers/welcome');
const UserModel = require('./userModel');
Router.get('/list',function(req,res){
    UserModel.getByNamePwd(function(rs){
        return res.json(rs);
    })
});//test
Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body;
    UserModel.findRepeat(user,function(rs){
        if(rs.length > 0){
            return res.json({code:1,msg:'用户名重复'})
        }
        UserModel.saveinfo(user,md5Pwd(pwd),type,function(rs){
            if(rs){
                return res.json({code:0})
            }else{
                return res.json({code:1,msg:'后端出错了'})
            }
        });
    });
})
Router.get('/info',function(req,res){
    //此处做Cookie的校验
    return res.json({code:1})
})

function md5Pwd(pwd){
    const salt = 'jokeraizy0203!#!$~';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router
//相当于Controller了