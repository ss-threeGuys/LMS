'use strict';

const express = require('express'); 

class Controller  {

    constructor(service) {
      this._service = service;

    }


    create(req, res) {

       // Use Builder 1st

      this._service.create(req.body)
          .then(data => res.json(data).status(201))
          .catch(this.exceptionHandler);
    }

    getAll(req, res) {
      
        this._service.findAll()
          .then(data => res.send(data))
          .catch(this.exceptionHandler);
    }

    getById(req, res) {
        let id = req.params.id;
        
        this._service.findById(id)
        .then(data => res.send(data))
        .catch(this.exceptionHandler);
    }

    update(req, res) {

        //Builder

      this._service.create(req.body)
      .then(data => res.json(data).status(204))
      .catch(this.exceptionHandler);
    }

    deleteById(req, res) {
      let id = req.params.id;

      return this._service.deleteById(id)
        .then(res.sendStatus(204))
        .catch(this.exceptionHandler)
    }

    exceptionHandler(e) {
      console.log(e);
    }

    getRouter() {
        const router = express.Router();

        router.post("/",this.create);
        router.get("/",this.getAll);
        router.get("/:id", this.getById);
        router.put("/",this.update);
        router.delete("/:id", this.deleteById);

        return router;
    }

    

};


module.exports = Controller;