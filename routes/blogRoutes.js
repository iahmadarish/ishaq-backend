const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlog);
router.post('/', blogController.createBlog);

// Add more routes as needed

module.exports = router;