var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const circleRouter = require('./routes/circles');
const cors = require('cors');
const port = 3030;


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/circles', circleRouter);


app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})

module.exports = app;
