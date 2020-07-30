const express = require('express');
const NewsletterController = require('../controllers/newsletter');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/suscribeEmail/:email', NewsletterController.suscribeEmail);

module.exports = api; 

