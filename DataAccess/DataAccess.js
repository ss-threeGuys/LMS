"use strict";

const mongoose = require("mongoose");

class DataAccess {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return this.db.find();
  }

  
  findPaginate(sortField, sortOrder, currentPage, pageSize, populate = []) {
    
    let sort = {};

    sort[sortField] = sortOrder;

    return this.db.paginate({}, { page: currentPage, limit: pageSize, sort: sort, populate: populate });

  }

  findById(id) {
    return this.db.findById(id);
  }

  create(data) {
    let result = this.db.create(data);

    return result;
  }

  update(data) {
    let result = this.db.findByIdAndUpdate(data._id, data);

    return result;
  }

  delete(id) {
    let result = this.db.findByIdAndDelete(id);

    return result;
  }
}

module.exports = DataAccess;
