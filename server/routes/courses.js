

const fs = require('fs');
const dataPath = './server/Data/Courses.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) data="{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};
module.exports = {
    create_course: function (req, res) {
        readFile((data)=>{
            // add the new course
            if (!req.body.id) return res.sendStatus(500);
            console.log(data);
            data[req.body.id] = req.body;
            data[req.body.id].students = {}; // Initialize the "students" field as an empty array

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new Course added');
            });
        },true);
    },
    update_course: function (req, res){
        readFile((data)=>{
            const courses = JSON.parse(data);
            if(!req.body.students){
                req.body.students = {};
            }
            const CourseID = req.params.id;
            courses[CourseID] = req.body;
            console.log(courses[CourseID]);
            writeFile(JSON.stringify(courses, null, 2), () => {
                res.status(200).send('Course updated');
            });
        });
    },
    delete_course: function (req, res){

        readFile(data => {

                // add the new user
                const CourseID = req.params["id"];
                delete data[CourseID];

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`Course id:${CourseID} removed`);
                });
            },
            true);
    },
    getCourses: function (req, res){
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else
                res.send(!data? JSON.parse("{}") : JSON.parse(data));
        });
    },
    getCourse: function (req, res){
        fs.readFile(dataPath, 'utf8', (err, data) => {
            const CourseID = req.params["id"];
            res.status(200).send(data[CourseID]); //still not tested
        });
    },
    AddStudentToCourse: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                // Handle the error if the file cannot be read
                console.error(err);
                res.sendStatus(500);
                return;
            }

            const courseData = JSON.parse(data); // Parse the JSON string into an object
            const courseId = req.params.id;
            const course = courseData[courseId];

            if (course) {
                if (!course.students) {
                    course.students = {}; // Initialize the students property if it doesn't exist
                }

                const newStudent = req.body;
                const studentId = newStudent.id;

                // Append the new student to the existing students object
                course.students[studentId] = newStudent;

                writeFile(JSON.stringify(courseData, null, 2), () => {
                    res.status(200).send(`Course id:${courseId} student added successfully`);
                });
            } else {
                console.log('Course not found.');
            }
        });
    }



}