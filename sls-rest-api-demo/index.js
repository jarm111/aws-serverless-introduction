const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./utils/dbConnection')();
const routes = require('./routes/todoRoutes');

app.use(bodyParser.json({ strict: false }));
routes(app, db);

module.exports.handler = serverless(app);
