const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { API_VERSION } = require('./config');

// Load routings
const userRoutes = require('./routers/user');

// config body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;