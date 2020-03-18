const url = require("url");

const utilities = require("../utilities/utilities");

class PaginateControllerPlugin {

    constructor(service) {
      this._service = service;
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

                res.format({
                "application/json": () => res.json([...data.docs,{__paging:paging}]),
                "application/xml": () => {
                    res.setHeader("Content-Type", "application/xml");
                    res.status(200);
                    res.send(this.xml({row:data.docs, paging:paging}));
                    },
                default: () => res.status(406).send("Not Acceptable")
                })
                
                
            })
        .catch(e => this.exceptionHandler(e, next));
    
    }

    xml(data) {
        return utilities.convertJSONtoXML(
        JSON.stringify(data),
        "docs",
        this._service.modelName
        );
    }

    exceptionHandler(e, next) {
        console.log(e);
        next(e);
    }
}


const pluginController = new PaginateControllerPlugin()

module.exports = function plugin(router, service) {
    const pluginController = new PaginateControllerPlugin(service);

    router.get("/paging",pluginController.getPaging.bind(pluginController));
}