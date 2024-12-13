const mongoose = require('mongoose');

const courseDetailSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
    },
    image:{
        type: String,
    },
    courseCurriculum: {
        type: [String], // List of topics
        default: [],
    },
    learningWithSoftware: {
        type: [String], // List of software/tools
        default: [],
    },
    courseOverview: {
        type: [String], // Overview of the course
        default: '',
    },
    whyThisCourse: {
        type: [String], // Why someone should take this course
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('CourseDetail', courseDetailSchema);
