const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/pictures");
    },
    filename: (req, file, cb) => {
        let name = file.originalname;
        cb(null, name);
    }
});

const upload = multer({
    storage: storage
});

// Get all posts by user
router.get('/users/:owner_id', async (req, res) => {
    let ownerID = req.params.owner_id;
    try {
        let postQuery = `SELECT * FROM posts WHERE owner_id = $1`;
        let result = await db.any(postQuery, [ownerID]);
        // Send back json object with sucess message and payload
        res.json({
            message: 'Request successful',
            payload: result
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong...'
        })
        console.log(err);
    }
});

// Get all Posts by circle
router.get('/circle/:circle_id', async (req, res) => {
    let circleID = req.params.circle_id
    try {
        let postQuery = `SELECT * FROM posts INNER JOIN users ON posts.owner_id = users.id WHERE circle_id = $1;`;
        let result = await db.any(postQuery, [circleID]);
        // Send back json object with success message and payload
        res.json({
            message: 'Request successful',
            payload: result
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong...'
        })
        console.log(err);
    }  
});

// Create Post and save image upload to folder
router.post('/register', upload.single('image_url'), async (req, res) => {
    try {
        let imgURL = `http://localhost:3030/${req.file.path.replace('public/', '')}`;
        let ownerAvi = await db.one(`SELECT avatar FROM users WHERE id = ${req.body.owner_id}`);
        console.log(ownerAvi);
        let postCircle = await db.one(`SELECT circle_name FROM circles WHERE id = ${req.body.circle_id}`);
        let insertQuery = `INSERT INTO posts (circle_id, owner_id, owner_avi, image_url, post_body, post_circle) VALUES ($1, $2, $3, $4, $5)`;
        await db.none(insertQuery, [req.body.circle_id, req.body.owner_id, ownerAvi.avatar, imgURL, req.body.post_body, postCircle.circle_name]);
        // Send back json object with success message and payload
        res.json({
            message: 'New Post made',
            imgURL: imgURL,                               
            payload: req.body
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong... could not create post'
        })
        console.log(err);
    }
});

// Delete Post
router.delete('/delete/:post_id', async(req, res) => {
    let postID = req.params.post_id
    try {
        let deleteQuery = `DELETE FROM posts WHERE id = $1`
        await db.none(deleteQuery,[postID]);
        // Send back json object with success message
        res.json({
            message: 'Post successfully deleted'
        });
    } catch (err) {
        res.json({
            message:  "Could not complete request"
        });
        console.log(err);
    }
})

module.exports = router;