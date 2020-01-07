
// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const circleRouter = require('./routes/circles');
const port = 3030;

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Post Router
const postRouter = require('./routes/posts');

app.use('/posts', postRouter)


app.use('/circles', circleRouter);



// app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})


module.exports = app;
