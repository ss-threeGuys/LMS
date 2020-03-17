'use strict';

const DataAccess = require('../DataAccess/DataAccess');

class Service {

    constructor (db, CustomDataAccess) {
        if ((CustomDataAccess === null)||(CustomDataAccess === undefined))
            this.dataAccess = new DataAccess(db);
        else
            this.dataAccess = new CustomDataAccess(db);

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
            return this.dataAccess.findAll();
    }

    findPaginate(sortField, sortOrder, currentPage, pageSize) {
        return this.dataAccess.findPaginate(sortField, sortOrder, currentPage, pageSize);
    }
    
    findById(id) {
        return this.dataAccess.findById(id);
    }


    create(data) {

        let proceed = false;

        if (this.beforeCreateHandler !== null)
            proceed = this.beforeCreateHandler(data);
        else
            proceed = true;

        if (!proceed) 
            return null;

        let result = this.dataAccess.create(data);

        if (this.afterCreateHandler !== null)
            this.afterCreateHandler(data, result);

        return result;
    }
    
    update(data) {

        let proceed = false;

        if (this.beforeUpdateHandler !== null)
            proceed = this.beforeUpdateHandler(data);
        else
            proceed = true;

        if (!proceed) 
            return null;

        let result = this.dataAccess.update(data);

        if (this.afterUpdateHandler !== null)
            this.afterUpdateHandler(data, result);

        return result;

    }
    
    delete(id) {

        let proceed = false;

        if (this.beforeDeleteHandler !== null)
            proceed = this.beforeDeleteHandler(id);
        else
            proceed = true;

        if (!proceed) 
            return null;
    
        let result = this.dataAccess.delete(id);

        if (this.afterDeleteHandler !== null)
            this.afterDeleteHandler(id, result);

        return result;
    }

}

module.exports = Service;