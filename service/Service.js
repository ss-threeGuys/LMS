'use strict';

const mongoose = require('mongoose');

class Service {
    
    constructor (db) {
        this.db = db;
    }

    findAll() {
        try {
            return this.db.find();
        } 
        catch(e) {
            console.log(e);
        }

    }
    
    findById(id) {
        return this.db.findById(id);
    }

    create(data) {
        return this.db.create(data);
    }
    
    update(data) {
        return this.db.findByIdAndUpdate(this.data.id, data);
    }
    
    delete(id) {
        return this.db.findByIdAndDelete(id);
    }

}

module.exports = Service;