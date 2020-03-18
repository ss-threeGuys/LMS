
const Borrower = require('../models/Borrower');

const findPaginateDAO = require('../DataAccess/findPaginate');

const findPaginate = (sortField, sortOrder, currentPage, pageSize)  =>
            findPaginateDAO(Borrower, sortField, sortOrder, currentPage, pageSize);

const getModelName = () => {return branch.collection.collectionName};

const findAllBorrowers = () => Borrower.find();

const createBorrower = (borrower) => Borrower.create(borrower);

const updateBorrower = (id, borrower) => Borrower.findByIdAndUpdate(id, {name : borrower.name,  address: borrower.address, phone: borrower.phone});

const deleteBorrower = (id) => Borrower.findByIdAndDelete(id);

module.exports = { findPaginate, getModelName, findAllBorrowers, createBorrower, updateBorrower, deleteBorrower };