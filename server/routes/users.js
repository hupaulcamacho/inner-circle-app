const express = require('express');
const router = express.Router();
const db = require('../db.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar')
  },
  filename: function (req, file, cb) {
    let name = file.originalname
    cb(null, name)
  }
})

const upload = multer({
  storage: storage
})

///////////////////////////////

//Route to get all the users 
router.get('/', async (req, res) => {

  try {
    const requestQuery = `SELECT * FROM users`

    let allUsers = await db.any(requestQuery)
    console.log('users', allUsers)
    res.json({
      data: allUsers,
      message: `All users were successfully retieved`
    })

  } catch (err) {
    res.status(404)
    res.json({
      message: `The request has failed`
    })

  }
})
/////////////////////////////////////

//Router to get users by username
router.get('/username/:username', async (req, res) => {
  let userInfo = req.params.username
  let requestQuery = `SELECT * FROM users WHERE username LIKE $1`
  
  try {
    let user = await db.any(requestQuery, [`%${userInfo}%`])
    res.json({
      data: user,
      message: `The users were successfully retrieved`
    })
  } catch (err) {
    console.log('error', err)
    res.status(404)
    res.json({
      message: `Failure to retrieve users`
    })
  }
})

// User Authentication
//Router to get users by username
router.get('/username/:use', async (req, res) => {
  let userInfo = req.params.username


  console.log('params!!!!1', userInfo)
  let requestQuery = ``
  if (by === 'email') {
    requestQuery = `SELECT * FROM users WHERE email LIKE $1`
  } else {
    requestQuery = `SELECT * FROM users WHERE username LIKE $1`
  }

  try {

    let user = await db.one(requestQuery, [`%${userInfo}%`])
    console.log('users email!!!!!', user)

    res.json({
      data: user,
      message: `The users were successfully retrieved`
    })
  } catch (err) {
    console.log('error', err)
    res.status(404)
    res.json({
      message: `Failure to retrieve users`
    })
  }
})

// User Authentication
router.post('/login/:username/:password', async (req, res) => {
  let username = req.params.username

  let password = req.params.password
  let loginQuery = `
  UPDATE users SET loggedIn = true WHERE username = $1;

  try {
    let user = await db.one(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password]);
    let login = await db.any(loginQuery, [username, password]);
    console.log(user.data);
    if (user.username === undefined) {
      throw Error('no user found');
    }
    res.json({
      message: 'login sucessful',
      loggedInUser: user
    })
  } catch (err) {
    console.log(err)
    res.status(404);
    res.json({
      message: 'Username or password is incorrect'
    })
  }
})

//////////////////////////////////////////////////

// Route to add a new user
router.post('/', upload.single('avatar'), async (req, res) => {
  console.log("post req body", req.body)
  try {
    let imgURL = `http://localhost:3030/images/avatar/${req.body.avatar.replace('public/', '')}`;
    console.log(imgURL)
    const insertQuery = `INSERT INTO users (username, email, avatar) VALUES ($1, $2, $3)`
    await db.none(insertQuery, [req.body.username, req.body.email, imgURL])


    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: imgURL

    }

    console.log(data)
    res.status(201)
    res.json({
      user: data,
      message: `The user has been successfully added`
    })

  } catch (err) {
    res.status(404)
    res.json({
      message: `Could not add the user`
    })
  }
})
///////////////////////////////////

//Route to upadate the user's information
router.patch('/:id', async (req, res) => {


  let query = `UPDATE users SET `

  // let updateQuery = ``
  if (req.body.email) {
    query += `email = $/email/, `
  }
  if (req.body.username) {
    query += `username= $/username/, `
  }
  if (req.body.avatar) {
    query += `avatar = $/avatar/, `
  }
  if (req.body.password) {
    query += `password = $/password/, ` 
  }
  query = query.slice(0, query.length -2)
   query+= ` WHERE id = $/id/`
  console.log('query', query)

  try {

    await db.any(query, {
        email:req.body.email, 
        username:req.body.username,
        avatar: req.body.avatar,
        password: req.body.password,
        id: req.params.id
      }
    )

    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password
    }

    res.json({
      user: data,
      message: `The user's information has been successfully updated`
    })
  } catch (err) {
    res.status(404)
    res.json({
      message: `Something went wrong!`
    })
  }
})
///////////////////////////////////////

//Route to delete a user
router.delete('/:id', async (req, res) => {
  let userId = req.params.id
  try {
    const deleteQuery = `DELETE FROM users WHERE id = $1`
    await db.none(deleteQuery, [userId])

    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar
    }
    res.json({
      user: data,
      message: `User was successfully deleted`
    })

  } catch (error) {
    res.status(404)
    res.json({
      message: `User not deleted!`
    })
  }
})



module.exports = router;