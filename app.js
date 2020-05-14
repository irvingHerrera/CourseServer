const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { API_VERSION } = require('./config');

// config body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


module.exports = app;