const express = require('express');
const MenuController = require('../controllers/menu');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/addmenu', [md_auth.ensureAuth], MenuController.addMenu);
api.get('/getMenu', [md_auth.ensureAuth], MenuController.getMenu);

module.exports = api; 