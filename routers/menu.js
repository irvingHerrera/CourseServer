const express = require('express');
const MenuController = require('../controllers/menu');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/addmenu', [md_auth.ensureAuth], MenuController.addMenu);
api.get('/getMenu', MenuController.getMenu);
api.put('/updateMenu/:id', [md_auth.ensureAuth], MenuController.updateMenu);
api.put('/activateMenu/:id', [md_auth.ensureAuth], MenuController.activateMenu);
api.delete('/deleteMenu/:id', [md_auth.ensureAuth], MenuController.deleteMenu);

module.exports = api; 