
module.exports = function findPaginate(db, sortField, sortOrder, currentPage, pageSize, populate = [] ) {
    
    let sort = {};

    sort[sortField] = sortOrder;

    return db.paginate({}, { page: currentPage, limit: pageSize, sort: sort, populate: populate });

  }