const { copyright, recordcode } = require('./../../../config');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

module.exports = (app) => {

    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.set('views', path.join(__dirname, '../templates'));
    app.locals = Object.assign({}, app.locals, {
        copyright,
        recordcode
    });

    app.use('/', express.static(path.join(__dirname, '../static')));

    app.use(bodyParser());
}