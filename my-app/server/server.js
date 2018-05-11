const express = require('express');
const userRouter = require('./user')

const app = express();


app.use('/user',userRouter);

app.listen(8000,function(){
    console.log('Node app start at prot 8000');
})