const utils = require('utility')
const express = require('express');
const Router = express.Router();
// const welcome = require('../controllers/welcome');
const UserModel = require('./userModel');
const VideoModel = require('./videoModel');
const ChatModel = require('./chatModel');
Router.get('/list', function (req, res) {
    VideoModel.getAllVideos(function (rs) {
        return res.json({ code: 0, data: rs })
    })
});//test
Router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body;
    UserModel.findRepeat(user, function (rs) {
        if (rs.length > 0) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        UserModel.saveinfo(user, md5Pwd(pwd), type, function (rs) {
            if (rs) {
                UserModel.findRepeat(user, function (rs) {
                    if (rs.length > 0) {
                        res.cookie('userid', rs[0].user_id);
                        return res.json({ code: 0 })
                    }
                    return res.json({ code: 1, msg: '后端出错了' })
                })
            } else {
                return res.json({ code: 1, msg: '后端出错了' })
            }
        });
    });
})
Router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    UserModel.checklogin(user, md5Pwd(pwd), function (rs) {
        if (rs.length <= 0) {
            return res.json({ code: 1, msg: '用户名或者密码错误' })
        }
        res.cookie('userid', rs[0].user_id)
        return res.json({ code: 0, data: rs })
    });
})
Router.post('/save', function (req, res) {
    const { video_id, user_id, time, content } = req.body;
    const v_id = parseInt(video_id);
    const u_id = parseInt(user_id);
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1, msg: '用户没登录' })
    }
    VideoModel.saveComment(v_id, u_id, time, content, function (rs) {
        if (!rs.affectedRows) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        VideoModel.getCommentsById(v_id, function (rs) {
            if (rs) {
                return res.json({ code: 0, data: rs })
            }
            return res.json({ code: 1, msg: '后端出错了' })
        })
    })


})

Router.get('/video', function (req, res) {
    const { video_id, user_id, cate_id } = req.query;
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1, msg: '用户没登录' })
    }
    VideoModel.getVideoById(video_id, function (rs) {
        return res.json({ code: 0, data: rs })
    })
});
Router.get('/comment', function (req, res) {
    const { video_id } = req.query;
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1, msg: '用户没登录' })
    }
    VideoModel.getCommentsById(video_id, function (rs) {
        return res.json({ code: 0, data: rs })
    })
});

Router.get('/search', function (req, res) {
    const { info } = req.query;
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1, msg: '用户没登录' })
    }
    VideoModel.searchVideos(info, function (rs) {
        return res.json({ code: 0, data: rs })
    })
});

Router.get('/info', function (req, res) {
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

Router.post('/update', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({ code: 1 })
    }
    const user_id = parseInt(req.cookies.userid);

    const body = req.body;
    const { desc, avator, address, school, college } = body;
    UserModel.updateInfo(desc, avator, user_id, address, school, college, function (rs) {
        if (!rs.affectedRows) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        UserModel.getById(userid, function (rs) {
            if (rs.length > 0) {
                return res.json({ code: 0, data: rs })
            }
            return res.json({ code: 1, msg: '后端出错了' })
        })
    });// 更新并返回数据

})

Router.get('/getmsgList', function (req, res) {
    const { userid } = req.cookies;
    const user_id = parseInt(req.cookies.userid);
    ChatModel.getMsgById(user_id, function (rs) {
        return res.json({ code: 0, msgs: rs })
    })

})

function md5Pwd(pwd) {
    const salt = 'jokeraizy0203!#!$~';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router
//相当于Controller了