
const Borrower = require('../models/Borrower');

const findAllBorrowers = () => Borrower.find();

const createBorrower = (borrower) => Borrower.create(borrower);

const updateBorrower = (id, borrower) => Borrower.findByIdAndUpdate(id, {name : borrower.name,  address: borrower.address, phone: borrower.phone});

const deleteBorrower = (id) => Borrower.findByIdAndDelete(id);

module.exports = { findAllBorrowers, createBorrower, updateBorrower, deleteBorrower };