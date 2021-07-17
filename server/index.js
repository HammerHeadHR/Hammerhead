const express = require('express');
const path = require('path')
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
const logoutRoutes = require('./routes/logout.js');
const {sessionKey} = require('../config.js')
const {createSession, verifySession, removeSession} = require('./middleware/session')
const { deleteSession } = require('../database/models/session');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/login', loginRoutes, createSession);

app.use(verifySession);

app.use('/datasets', formidable());
app.use('/datasets', datasetRoutes);

app.use('/users', userRoutes);

app.use('/teams', teamRoutes);

app.use('/notes', noteRoutes);

app.use('/notifications', notificationRoutes);

app.use('/logout', removeSession, logoutRoutes)

app.get('/*', (req, res) => {
  res.sendFile((path.join(__dirname, '../client/dist/index.html')));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

