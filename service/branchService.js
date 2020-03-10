
const Branch = require('../models/Branch');

const findAllBranches = () => Branch.find();

const createBranch = (branch) => Branch.create(branch);

const updateBranch = (id,branch) => Branch.findByIdAndUpdate(id, {branchName : branch.branchName, branchAddress: branch.branchAddress});

const deleteBranch = (id) => Branch.findByIdAndDelete(id);

module.exports = { findAllBranches, createBranch, updateBranch, deleteBranch };