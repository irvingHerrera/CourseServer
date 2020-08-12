const express = require('express');
const CourseController = require('../controllers/course');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/addcourse', [md_auth.ensureAuth], CourseController.addCourse);
api.get('/getCourse', CourseController.getCourse);
api.delete('/deleteCourse/:id', [md_auth.ensureAuth], CourseController.deleteCourse);
api.put('/updateCourse/:id', [md_auth.ensureAuth], CourseController.updateCourse);

module.exports = api; 