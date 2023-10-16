const express = require('express');
const CourseRoutes = require("./courses");

router = express.Router();

router.get('/courses',CourseRoutes.getCourses);
router.post('/courses', CourseRoutes.create_course);
router.put('/courses/:id', CourseRoutes.update_course);
router.get('/courses/:id', CourseRoutes.getCourse);
router.delete('/courses/:id', CourseRoutes.delete_course);
router.post('/courses/:id/student', CourseRoutes.AddStudentToCourse);


module.exports = router;