'use strict';

const express = require('express'); 
const Controller = require('./Controller');
const publisherService = require('../service/publisherService');

class PublisherController extends Controller {



    constructor(service) {
      super(service);
    }

  

  
    

};
const publisherController = new PublisherController(publisherService);

module.exports = publisherController.getRouter();