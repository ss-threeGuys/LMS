'use strict';

const express = require('express'); 
const Controller = require('./Controller');
const publisherService = require('../service/publisherService');

class PublisherController extends Controller {

    // Singleton pattern
    static _instance = new PublisherController(publisherService);

    constructor(service) {
      super(service);
    }

    get instance() {
      return _instance;
    }

  
    

};


module.exports = (PublisherController._instance).getRouter();