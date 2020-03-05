'use strict';
const mongoose = require('mongoose');
const Service = require('Service');
const genre = require('../models/Genre');

class GenreService extends Service {

    static _instance  = new GenreService(genre);

    constructor (db) {
        super(db);
    }

    // Singleton
    get instance() {
        return _instance;
    }

}

module.exports = GenreService.instance;