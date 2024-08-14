import express from 'express';
import { getAllCourses, getCourseLecture,addLecture, deleteCourse,deleteLecture} from '../controller/courseController.js';
import { createCourse } from '../controller/courseController.js';
import { addtoPlaylist, logoutUser, registerUser } from '../controller/userController.js';
import { loginUser } from '../controller/userController.js';
import  {uploadprofilepic}  from '../controller/courseController.js';
import upload from '../middleware/multer.js';
import { isAuthenticated,AuthorizeAdmin } from '../middleware/auth.js';
import {removeFromPlayList} from '../controller/userController.js';
import singleUpload from '../middleware/multer.js';
import { Mailsended } from '../controller/Mailcontroller.js';

const router =express.Router();

router.route("/allcourses").get(isAuthenticated,getAllCourses);

router.route("/createcourse").post(singleUpload,createCourse);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route('/logout').post(logoutUser);
 router.route('/uploadprofilepic').post(singleUpload,uploadprofilepic);
router.route('/addtoplaylist').post(isAuthenticated,addtoPlaylist);
router.route('/removefromplaylist').post(isAuthenticated,removeFromPlayList)
router.route("/course/:id").get(getCourseLecture).post(singleUpload,addLecture).delete(deleteCourse);
router.route("lecture").delete(isAuthenticated,deleteLecture)
router.route('/sendmail').post(Mailsended)
export default router;