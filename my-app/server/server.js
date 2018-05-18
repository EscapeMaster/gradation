const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const ChatModel = require('./chatModel');
const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const { from, to, msg } = data;
        const _to = parseInt(to);
        const chatid = [from, _to].sort().join('_');
        const time = new Date().getTime();
        ChatModel.saveMsg(from, _to, msg, chatid, time, function (rs) {
            if (rs) {
                ChatModel.getMsgByInsertId(rs.insertId, function (data) {
                    io.emit('recvmsg', data[0])
                })
            }

        });
    })
})

app.use(cookieParser());//可以解析cookie
app.use(bodyParser.json());//解析post过来的json
app.use('/user', userRouter);
server.listen(8000, function () {
    console.log('Node app start at prot 8000');
})