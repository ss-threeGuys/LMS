"use strict";

const express = require("express");

const url = require("url");

class Controller {
  constructor(service) {
    this._service = service;
  }

  create(req, res, next) {
    // Use Builder 1st

    this._service
      .create(req.body)
      .then(data => res.status(201).json(data))
      .catch(e => this.exceptionHandler(e, next));
  }

  getAll(req, res, next) {
    this._service
      .findAll()
      .then(data => res.send(data))
      .catch(e => this.exceptionHandler(e, next));
  }

  getPaging(req, res, next) {
    const queryParams = url.parse(req.url,true).query;

    if (!queryParams.currentPage || !queryParams.pageSize) {
      return res.sendStatus(400);
    }

    this._service
      .findPaginate(queryParams.sortField, queryParams.sortOrder, queryParams.currentPage, queryParams.pageSize) 
      .then(data => {

            let paging = {
                currentPage: data.page,
                pageSize: data.limit,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                prev: data.hasPrevPage,
                next: data.hasNextPage,
                count: data.totalDocs,
                sortField: queryParams.sortField,
                sortOrder: queryParams.sortOrder
            };
            res.setHeader('x-paging', JSON.stringify(paging));
            
            res.send([...data.docs,{__paging:paging}]);
          })
      .catch(e => this.exceptionHandler(e, next));
  
  }

  getById(req, res, next) {
    let id = req.params.id;

    this._service
      .findById(id)
      .then(data => res.send(data))
      .catch(e => this.exceptionHandler(e, next));
  }

  update(req, res, next) {
    //Builder
    if (req.params.id !== req.body._id) {
      return res.sendStatus(400);
    }
    this._service
      .update(req.body)
      .then(data => res.status(204).json(data))
      .catch(e => this.exceptionHandler(e, next));
  }

  deleteById(req, res, next) {
    let id = req.params.id;

    return this._service
      .delete(id)
      .then(res.sendStatus(204))
      .catch(e => this.exceptionHandler(e, next));
  }

  exceptionHandler(e, next) {
    console.log(e);
    next(e);
  }

  getRouter() {
    const router = express.Router();

    router.post("/", this.create.bind(this));
    router.get("/", this.getAll.bind(this));
    router.get("/paging", this.getPaging.bind(this));
    router.get("/:id", this.getById.bind(this));
    router.put("/:id", this.update.bind(this));
    router.delete("/:id", this.deleteById.bind(this));

    return router;
  }
}

module.exports = Controller;
