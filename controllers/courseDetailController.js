const CourseDetail = require('../models/CourseDetails');
const Course = require('../models/Course');

// Create or Update Course Details
exports.createOrUpdateCourseDetails = async (req, res) => {
    try {
        const { courseId, courseCurriculum, learningWithSoftware, courseOverview, whyThisCourse, price, discount, image } = req.body;

        // Find existing details
        let details = await CourseDetail.findOne({ courseId });

        if (details) {
            // Update existing details
            details.courseCurriculum = courseCurriculum || details.courseCurriculum;
            details.learningWithSoftware = learningWithSoftware || details.learningWithSoftware;
            details.courseOverview = courseOverview || details.courseOverview;
            details.whyThisCourse = whyThisCourse || details.whyThisCourse;
            details.price = price || details.price;
            details.discount = discount || details.discount; 
            details.image = image || details.image;
            await details.save();
        } else {
            // Create new details
            details = new CourseDetail({
                courseId,
                courseCurriculum,
                learningWithSoftware,
                courseOverview,
                whyThisCourse,
                price,
                discount,
                image
            });
            await details.save();

            // Update the Course to reference this detail
            const course = await Course.findById(courseId);
            if (course) {
                course.details = details._id;
                await course.save();
            }
        }

        res.status(200).json({ message: 'Course details updated successfully', details });
    } catch (err) {
        res.status(500).json({ message: 'Error updating course details', error: err.message });
    }
};

// Get Course Details
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;
        const details = await CourseDetail.findOne({ courseId });

        if (!details) {
            return res.status(404).json({ message: 'Course details not found' });
        }

        res.status(200).json(details);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course details', error: err.message });
    }
};
