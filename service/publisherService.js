'use strict';
const mongoose = require('mongoose');
const Service = require('./Service');
const publisher = require('../models/Publisher');

class PublisherService extends Service {

    constructor (db) {
        super(db);
    }


}


const publisherService = new PublisherService(publisher);
module.exports = publisherService;