
const Branch = require('../models/Branch');

const findAllBranches = () => Branch.find();

const createBranch = (branch) => Branch.create(branch);

const updateBranch = (branch) => Branch.findByIdAndUpdate(branch._id, {branchName : branch.branchName});

const deleteBranch = (id) => Branch.findByIdAndDelete(id);

module.exports = { findAllBranches, createBranch, updateBranch, deleteBranch };