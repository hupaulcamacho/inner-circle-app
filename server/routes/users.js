const express = require('express');
const router = express.Router();
const db = require('../db.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

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
router.get('/:email', async(req, res) => {
  let userEmail = req.params.email
  console.log('params', userEmail)
  try {
    const requestQuery = `SELECT id, email FROM users WHERE email = $1`
    
    let allUsersByEmail = await db.one(requestQuery, [userEmail])
         console.log('users email', allUsersByEmail)
    res.json({
      data: allUsersByEmail,
      message: `The user was successfully retrieved`
    })
  } catch (err) {
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
