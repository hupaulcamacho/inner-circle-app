const express = require('express');
const router = express.Router();
const db = require('../db.js');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({
  storage: storage
})

///////////////////////////////

//Route to get all the users 
router.get('/', async(req, res) => {
   
  try {
    const requestQuery = `SELECT * FROM users`
   
    let allUsers = await db.any(requestQuery)
       console.log('users', allUsers)
      res.json({
        data: allUsers,
        message: `All users were successfully retieved`
      })

  } catch (err){
    res.status(404)
    res.json({
      message: `The request has failed`
    })
    
  }
})
/////////////////////////////////////

//Router to get users by email only
router.get('/:by/:value', async(req, res) => {
  let userInfo = req.params.value
  let by = req.params.by
 
    console.log('params', userInfo)
    let requestQuery = ``
  if (by === 'email') {
     requestQuery = `SELECT id, email FROM users WHERE email = $1`
  } else {
     requestQuery = `SELECT id, username FROM users WHERE username = $1`
  }
 
    try {
    
      let user = await db.one(requestQuery, [userInfo])
         console.log('users email', user)
      res.json({
        data: user,
        message: `The user was successfully retrieved`
      })
    } catch (err) {
      console.log('error', err)
      res.status(404)
      res.json({
        message: `Failure to retrieve user`
      })
    }
})



//////////////////////////////////////////////////

//Route to add a new user
router.post('/', async(req, res) => {
  try {
    // let avatarUrl = 
    const insertQuery = `INSERT INTO users (username, email, avatar) VALUES ($1, $2, $3)`
    await db.none(insertQuery, [req.body.username, req.body.email, req.body.avatar])

    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar
    }
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
router.patch('/:id', async(req, res) => {

  let userId  = req.params.id
  try {
    const updateQuery = `UPDATE USERS SET username=$1, email=$2, avatar=$3 WHERE id=22`;
    await db.any(updateQuery, [req.body.username, req.body.email, req.body.avatar], userId)
    
    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar
    }

     res.json({
      user: data,
      message: `The user's information has been successfully updated`
    })
  } catch (err){
    res.status(404)
     res.json({
       message: `Something went wrong!`
     })
 }
})
///////////////////////////////////////

//Route to delete a user
router.delete('/:id', async(req, res) => {
  let userId = req.params.id
  try {
    const deleteQuery = `DELETE FROM users WHERE id = $1`
    await db.none(deleteQuery, [userId] )

    let data = {
       username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar
    }
    res.json({
      user: data,
      message: `User was successfully deleted`
    })

  }catch (error) {
    res.status(404)
    res.json({
      message: `User not deleted!`
    })
  }
})



module.exports = router;
