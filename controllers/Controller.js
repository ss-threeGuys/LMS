'use strict';

const express = require('express'); 

class Controller  {

  
    constructor(service) {
      this._service = service;
      
    }

    create(req, res, next) {

       // Use Builder 1st

      this._service.create(req.body)
          .then(data => res.json(data).status(201))
          .catch(e=>this.exceptionHandler(e, next));
    }

    getAll(req, res, next) {
    
        this._service.findAll()
          .then(data => res.send(data))
          .catch(e=>this.exceptionHandler(e, next));

    }

    getById(req, res, next) {
        let id = req.params.id;
        
        this._service.findById(id)
        .then(data => res.send(data))
        .catch(e=>this.exceptionHandler(e, next));
    }

    update(req, res, next) {

        //Builder

      this._service.create(req.body)
      .then(data => res.json(data).status(204))
      .catch(e=>this.exceptionHandler(e, next));
    }

    deleteById(req, res, next) {
      let id = req.params.id;

      return this._service.deleteById(id)
        .then(res.sendStatus(204))
        .catch(e=>this.exceptionHandler(e, next))
    }

    exceptionHandler(e, next) {
      console.log(e);
      next(e);
    }

    getRouter() {
        const router = express.Router();

        router.post("/",this.create.bind(this));
        router.get("/",this.getAll.bind(this));
        router.get("/:id", this.getById.bind(this));
        router.put("/",this.update.bind(this));
        router.delete("/:id", this.deleteById.bind(this));

        return router;
    }


};


module.exports = Controller;