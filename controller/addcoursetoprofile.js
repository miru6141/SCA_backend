// Backend Route: POST /api/v1/user/addCourse
import Course from "../modals/Course.js";
import usermodel from "../modals/usermodel.js";
import mongoose from "mongoose";
  export   const  addcourse= async (req, res) => {
    const { courseId } = req.body;
    
    const {userId} = req.body;

    console.log(courseId)
   
    try {
       
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid courseId format' });
        }
    
        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        

        // Add course to user's playList
        const user = await usermodel.findById(userId);
        user.playList.push({ course: course._id, poster: course.poster.url });
        await user.save();

        res.status(200).json({ message: 'Course added to profile successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course to profile', error });
    }
}
