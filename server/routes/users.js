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
// Route to add a new user
router.post('/', async (req, res) => {
  console.log("post req body", req.body)

  try {

    const insertQuery = `INSERT INTO users (username, email, password, avatar, loggedIn) VALUES ($1, $2, $3, $4, $5)`
    await db.none(insertQuery, [req.body.username, req.body.email, req.body.password, null, false])


    let data = {
      username: req.body.username,
      email: req.body.email
    }

    console.log(data)
    res.status(201)
    res.json({
      user: data,
      message: `success`
    })

  } catch (err) {
    res.status(404)
    res.json({
      message: `Could not add the user`
    })
  }
})

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

router.get('/id/:id', async (req, res) => {
  console.log('i ran');
  let id = parseInt(req.params.id);
  console.log(typeof id);
  try {
    const requestQuery = `SELECT * FROM users WHERE id = ${id}`
    console.log(requestQuery);  
    let user = await db.one(requestQuery)
    console.log(user);
    res.json({
      data: user,
      message: `The user was successfully retieved`
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

    let users = await db.any(requestQuery, [`%${userInfo}%`])
    
    res.json({
      data: users,
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
  `


  try  {
    let user = await db.one(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password]);
    let login = await db.any(loginQuery, [username, password]);
    console.log( user.data);
    if(user.username === undefined){
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



///////////////////////////////////

//Route to upadate the user's information
router.patch('/:id', async (req, res) => {
console.log(req.body.logout);
  let by = req.params.by
  let value = req.params.value
  let query = `UPDATE users SET `

  // let updateQuery = ``
  if (req.body.email) {
    query += `email = ${req.body.email},`
  }
  if (req.body.username) {
    query += `username= ${req.body.username}, `
  }
  if (req.body.avatar) {
    query += `avatar = ${req.body.avatar}, `
  }
  if (req.body.password) {
    query += `password = ${req.body.password},` 
  }
  query = query.slice(0, query.length -1);
  if(req.body.logout){
    query += ` loggedIn = ${false}`
  }
   query+= ` WHERE id = ${req.body.id}`
  console.log('query', query)

  try {

    let response = await db.any(query, {
        email:req.body.email, 
        username:req.body.username,
        avatar: req.body.avatar,
        password: req.body.password,
        id: req.params.id,
        loggedIn: false
      }
    )
    console.log(response);

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