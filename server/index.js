const express = require('express');
const app = express();
const port = 3000;
const client = require('../database');
const csv = require('csv-parser');
const fs = require('fs');
const formidable = require('express-formidable');
const userRoutes = require('./routes/users.js');
const teamRoutes = require('./routes/teams.js');
const datasetRoutes = require('./routes/datasets.js');
const noteRoutes = require('./routes/notes.js');
const notificationRoutes = require('./routes/notifications.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/datasets', formidable());

app.use('/users', userRoutes);

app.use('/teams', teamRoutes);

app.use('/datasets', datasetRoutes);

app.use('/notes', noteRoutes);

app.use('/notifications', notificationRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

