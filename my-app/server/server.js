const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user')

const app = express();

app.use(cookieParser());//可以解析cookie
app.use(bodyParser.json());//解析post过来的json
app.use('/user',userRouter);

app.listen(8000,function(){
    console.log('Node app start at prot 8000');
})