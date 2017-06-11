'use strict';

const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const env = require('../../env')

app.use(morgan('dev'));

app.use(express.static(env.PUBLIC_DIR));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./middleware/pagination'))

app.use('/api', require('./routes'));

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'browser/index.html'));
});

app.use(function (req, res, next) {
    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;