'use strict';

const mongoose = require('mongoose');

class Service {
    
    constructor (db) {
        this.db = db;

        this.beforeCreateHandler = null;
        this.afterCreateHandler = null;

        this.beforeUpdateHandler = null;
        this.afterUpdateHandler = null;

        this.beforeDeleteHandler = null;
        this.afterDeleteHandler = null;
    }

    set onBeforeCreate(handler) {
        this.beforeCreateHandler = handler;
    }

    set onAfterCreate(handler) {
        this.afterCreateHandler = handler;
    }

    set onBeforeUpdate(handler) {
        this.beforeUpdateHandler = handler;
    }

    set onAfterUpdate(handler) {
        this.afterUpdateHandler = handler;
    }

    set onBeforeDelete(handler) {
        this.beforeDeleteHandler = handler;
    }

    set onAfterDelete(handler) {
        this.afterDeleteHandler = handler;
    }

    findAll() {
            return this.db.find();
    }
    
    findById(id) {
        return this.db.findById(id);
    }


    create(data) {

        let proceed = false;

        if (this.beforeCreateHandler !== null)
            proceed = this.beforeCreateHandler(data);
     
        if (!proceed) 
            return null;

        let result = this.db.create(data);

        if (this.afterCreateHandler !== null)
            this.afterCreateHandler(data, result);

        return result;
    }
    
    update(data) {

        let proceed = false;

        if (this.beforeUpdateHandler !== null)
            proceed = this.beforeUpdateHandler(data);

        if (!proceed) 
            return null;

        let result = this.db.findByIdAndUpdate(this.data.id, data);

        if (this.afterUpdateHandler !== null)
            this.afterUpdateHandler(data, result);

        return result;

    }
    
    delete(id) {

        let proceed = false;

        if (this.beforeDeleteHandler !== null)
            proceed = this.beforeDeleteHandler(id);

        if (!proceed) 
            return null;
    
        let result = this.db.findByIdAndDelete(id);

        if (this.afterDeleteHandler !== null)
            this.afterDeleteHandler(id, result);

        return result;
    }

}

module.exports = Service;