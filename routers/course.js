const express = require('express');
const CourseController = require('../controllers/course');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/addcourse', [md_auth.ensureAuth], CourseController.addCourse);
api.get('/getCourse', CourseController.getCourse);

module.exports = api; 