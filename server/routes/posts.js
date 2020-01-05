const express = require('express');
const router = express.Router();
const db = require('../db')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        let name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
});

const upload = multer({
    storage: storage
})

// Get all posts by user
router.get()