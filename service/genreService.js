'use strict';
const mongoose = require('mongoose');
const Service = require('./Service');
const genre = require('../models/Genre');

class GenreService extends Service {

    constructor (db) {
        super(db);
    }

}

const genreService = new GenreService(genre);

module.exports = genreService;