const express = require('express');
const UserController = require('../controllers/user');
const multipart = require('connect-multiparty');

const md_auth = require('../middleware/authenticated');
const md_upload_avatar = multipart({ uploadDir: './uploads/avatar' });

const api = express.Router();

api.post('/sign-up', UserController.signUp);
api.post('/sign-in', UserController.signIn);
api.get('/users', [md_auth.ensureAuth], UserController.getUsers);
api.get('/usersActive', [md_auth.ensureAuth], UserController.getUsersActive);
api.put('/uploadAvatar/:id', [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get('/getavatar/:avatarName', UserController.getAvatar);
api.put('/updateUser/:id', [md_auth.ensureAuth], UserController.updateUser);
api.put('/activateuser/:id', [md_auth.ensureAuth], UserController.activateUser);
api.delete('/deleteUser/:id', [md_auth.ensureAuth], UserController.deleteUser);
api.post('/singUpAdmin', [md_auth.ensureAuth], UserController.singUpAdmin);

module.exports = api; 