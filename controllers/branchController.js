const express = require("express");
const router = express.Router();
const branchService = require("../service/branchService");

router.get("/", function(req, res) {
  branchService
    .findAllBranches()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", function(req, res) {
  if (!req.body.branchName || req.body.branchName.length < 2) {

    branchFormat = {branchName: "branchName(length > 2)" }
    return res.status(400).json(branchFormat);
  }

  branch = req.body;

  return branchService
    .createBranch(branch)
    .then(data => res.json(data).status(201))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.put("/", function(req, res) {
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
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", function(req, res) {
  id = req.params.id;

  return branchService
    .deleteBranch(id)
    .then(res.sendStatus(204))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
