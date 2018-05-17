const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user')
const app = express();
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        // console.log(data)
        io.emit('recvmsg',data)
    })
})

app.use(cookieParser());//可以解析cookie
app.use(bodyParser.json());//解析post过来的json
app.use('/user', userRouter);
server.listen(8000, function () {
    console.log('Node app start at prot 8000');
})