const Blog = require('../models/Blog');

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  const createnewblogs = new Blog(req.body);
  try {
    const newBlog = await createnewblogs.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add more controller functions as needed 