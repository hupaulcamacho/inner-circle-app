require('dotenv').config();
// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');



const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());

const circleRouter = require('./routes/circles');

// Post Router
const postRouter = require('./routes/posts');

app.use('/posts', postRouter)


app.use('/circles', circleRouter);

// app.use('/public', avatarRouter);

// app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});


module.exports = app;
