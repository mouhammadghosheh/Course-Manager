const express = require("express");
const bodyParser = require("express");
const router = require("./server/routes/routes");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/list', express.static(path.join(__dirname, 'client/html/list.html')));
app.use('/course', express.static(path.join(__dirname, 'client/html/createCourse.html')));
app.use('/course/:id', express.static(path.join(__dirname, 'client/html/editCourse.html')));
app.use('/course/:id/student', express.static(path.join(__dirname, 'client/html/add_student.html')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));
app.use('/js', express.static(path.join(__dirname, 'client/js')));
app.use('/assets', express.static(path.join(__dirname, 'client/assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
const port = 3001;
app.listen(port,() => console.log('listening on 3001'))