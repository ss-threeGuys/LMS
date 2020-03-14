'use strict';

const mongoose = require('mongoose');

class DataAccess {
    
    constructor (db) {
        this.db = db;
    }

    findAll() {
            return this.db.find();
    }
    
    findById(id) {
        return this.db.findById(id);
    }


    create(data) {

        let result = this.db.create(data);

        return result;
    }
    
    update(data) {

        let result = this.db.findByIdAndUpdate(this.data.id, data);

        return result;

    }
    
    delete(id) {
    
        let result = this.db.findByIdAndDelete(id);

        return result;
    }

}

module.exports = DataAccess;