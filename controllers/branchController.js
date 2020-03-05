const express = require("express");
const router = express.Router();
const branchService = require("../service/branchService");

router.get("/", function(req, res, next) {
  branchService
    .findAllBranches()
    .then(data => {
      res.json(data);
    })
    .catch(next)
});

router.post("/", function(req, res, next) {
  if (!req.body.branchName || req.body.branchName.length < 2) {

    branchFormat = {branchName: "branchName (required and length > 2)" }
    return res.status(400).json(branchFormat);
  }

  branch = req.body;

  return branchService
    .createBranch(branch)
    .then(data => res.json(data).status(201))
    .catch(next)
});

router.put("/", function(req, res, next) {
  if (!req.body.branchName || req.body.branchName.length < 2) {
    return res.sendStatus(400);
  }
  if (!req.body._id) {
    return res.sendStatus(400);
  }

  branch = req.body;

  return branchService
    .updateBranch(branch)
    .then(res.sendStatus(204))
    .catch(next)
});

router.delete("/:id", function(req, res, next) {
  id = req.params.id;

  return branchService
    .deleteBranch(id)
    .then(res.sendStatus(204))
    .catch(next)
});

module.exports = router;
