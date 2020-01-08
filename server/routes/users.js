const express = require('express');
const router = express.Router();
const db = require('../db.js');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
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

//Router to get users by email and username
router.get('/:by/:value', async(req, res) => {
  let userInfo = req.params.value
  let by = req.params.by
 
    console.log('params', userInfo)
    let requestQuery = ``
  if (by === 'email') {
     requestQuery = `SELECT id, email FROM users WHERE email LIKE $1`
  } else {
     requestQuery = `SELECT id, username FROM users WHERE username LIKE $1`
  }
 
    try {
    
      let user = await db.any(requestQuery, [`%${userInfo}%`])
         console.log('users email', user)
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



//////////////////////////////////////////////////

//Route to add a new userv
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    let avatarUrl = `http://localhost:3030/${req.file.path.replace('public/', '')}`
    const insertQuery = `INSERT INTO users (username, email, avatar) VALUES ($1, $2, $3)`
    await db.none(insertQuery, [req.body.username, req.body.email, avatarUrl])

    let data = {
      username: req.body.username,
      email: req.body.email,
      avatar: avatarUrl
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
