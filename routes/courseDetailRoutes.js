const express = require('express');
const router = express.Router();
const { createOrUpdateCourseDetails, getCourseDetails } = require('../controllers/courseDetailController');

// Route for creating or updating course details
router.post('/', createOrUpdateCourseDetails);

// Route for fetching course details by courseId
router.get('/:courseId', getCourseDetails);

module.exports = router;
