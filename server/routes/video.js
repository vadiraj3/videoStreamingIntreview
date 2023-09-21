const express = require('express');
const { uploadVideo, getVideos } = require('../controllers/video'); // Import controller functions
const router = express.Router();
const upload = require('../middlewares/multer');

router.route('/').get(getVideos).post(upload.single('video'), uploadVideo);

// Define other routes and their handlers here

module.exports = router;
