'use strict';

const express = require('express'); 
const Controller = require('./Controller');
const genreService = require('../service/genreService');

class GenreController extends Controller {


    constructor(service) {
      super(service);
    }

   
};

const genreController = new GenreController(genreService);

module.exports = genreController.getRouter();