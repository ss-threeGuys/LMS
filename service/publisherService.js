'use strict';
const mongoose = require('mongoose');
const Service = require('Service');
const publisher = require('../models/Publisher');

class PublisherService extends Service {

    static _instance  = new PublisherService(publisher);

    constructor (db) {
        super(db);
    }

    // Singleton
    get instance() {
        return _instance;
    }

}

module.exports = PublisherService.instance;