// controllers/courseController.js
const Course = require('../models/Course');
const Category = require('../models/Category');
// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { name, description, duration, categoryName } = req.body;

        // Find category by name
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        // Create course with category's ID and name
        const course = new Course({
            name,
            description,
            duration,
            category: category._id,
            categoryName: category.name, // Store category name
        });

        await course.save();

        // Update category with the new course ID
        category.courses.push(course._id);
        await category.save();

        res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
        res.status(500).json({ message: "Error creating course", error: err.message });
    }
};

// Get courses by category
exports.getCoursesByCategory = async (req, res) => {
    try {
        const courses = await Course.find({ category: req.params.categoryId }).populate('category');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err });
    }
};

exports.getCourses = async (req, res) => {
    try {
        // কোর্সের তালিকা পেতে
        const courses = await Course.find().populate('category'); // Populate category details
        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.status(200).json(courses);
    } catch (err) {
        console.error('Error fetching courses:', err.message);
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
};