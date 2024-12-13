const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String }, // Duration of the course
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },  // Linking to Category
    categoryName: { type: String, required: true }, // Category name directly stored
    details: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CourseDetail', // Reference to CourseDetail
    },
}, { timestamps: true });

// After saving a course, update the category to include this course
courseSchema.post('save', async function (doc) {
    try {
        await Category.findByIdAndUpdate(doc.category, { 
            $push: { courses: doc._id } 
        });
    } catch (err) {
        console.error("Error updating category with new course:", err);
    }
});

// After removing a course, update the category to remove this course
courseSchema.post('remove', async function (doc) {
    try {
        await Category.findByIdAndUpdate(doc.category, { 
            $pull: { courses: doc._id } 
        });
    } catch (err) {
        console.error("Error updating category after course removal:", err);
    }
});

module.exports = mongoose.model('Course', courseSchema);
