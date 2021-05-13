const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/users');
const requestRoutes = require('./api/routes/requests');
const techRoutes = require('./api/routes/techs');
const adminRoutes = require('./api/routes/admins');

//Credentials to connect to the mongo server
mongoose.connect('mongodb+srv://<user>:<password>@cluster0.wmjyx.mongodb.net/<tableName>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
//Extracts json data and makes it easily readable
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Prevent Cors Errors
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//Routes which should handle requests
app.use('/users', userRoutes);
app.use('/requests', requestRoutes);
app.use('/techs', techRoutes);
app.use('/admins', adminRoutes);

//Error message when we write a nonexistent /url
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//Error message to other variables
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;