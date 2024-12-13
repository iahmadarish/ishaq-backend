// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/create', courseController.createCourse);
router.get('/category/:categoryId', courseController.getCoursesByCategory);
router.get('/', courseController.getCourses);

module.exports = router;
