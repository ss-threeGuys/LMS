'use strict';

const express = require('express'); 
const Controller = require('Controller');
const genreService = require('../service/genreService');

class GenreController extends Controller {

    // Singleton pattern
    static _instance = new GenreController(genreService);

    constructor(service) {
      super(service);
    }

    get instance() {
      return _instance;
    }

  
    

};


module.exports = (GenreController.instance).getRouter();