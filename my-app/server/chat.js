const express = require('express');
const Router = express.Router();
const UserModel = require('./userModel');
Router.get('/user/info', function (req, res) {
    //此处做Cookie的校验验证登录的状态
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 });
    }
    UserModel.getById(userid, function (rs) {
        if (rs.length > 0) {
            return res.json({ code: 0, data: rs })
        }
        return res.json({ code: 1, msg: '后端出错了' })
    });
})

module.exports = Router
//相当于Controller了