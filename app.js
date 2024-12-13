const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const courseDetailRoutes = require('./routes/courseDetailRoutes.js'); // 

dotenv.config();
const app = express();
const cors = require('cors');
// Allow requests from all origins
app.use(cors());

// restrict to specific origin (e.g., your frontend)
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only this origin
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/course-details', courseDetailRoutes);
module.exports = app;