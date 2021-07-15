const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
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
const loginRoutes = require('./routes/login.js');
const {sessionKey} = require('../config.js')
const {createSession, verifySession} = require('./middleware/session')

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/login', loginRoutes, createSession);
// app.use('/login', createSession, loginRoutes);
app.use(verifySession)


app.use('/datasets', formidable());
app.use('/datasets', datasetRoutes);

app.use('/users', userRoutes);

app.use('/teams', teamRoutes);

app.use('/notes', noteRoutes);

app.use('/notifications', notificationRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

