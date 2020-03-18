
const Branch = require('../models/Branch');

const findPaginateDAO = require('../DataAccess/findPaginate');

const findPaginate = (sortField, sortOrder, currentPage, pageSize)  =>
            findPaginateDAO(Branch, sortField, sortOrder, currentPage, pageSize);

const getModelName = () => {return branch.collection.collectionName};

const findAllBranches = () => Branch.find();

const createBranch = (branch) => Branch.create(branch);

const updateBranch = (id,branch) => Branch.findByIdAndUpdate(id, {branchName : branch.branchName, branchAddress: branch.branchAddress});

const deleteBranch = (id) => Branch.findByIdAndDelete(id);

module.exports = { findPaginate, getModelName, findAllBranches, createBranch, updateBranch, deleteBranch };