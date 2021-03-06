const express = require('express');
const PostController = require('../controllers/post');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/addpost', [md_auth.ensureAuth], PostController.addPost);

module.exports = api; 