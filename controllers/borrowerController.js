const express = require("express");
const router = express.Router();
const borrowerService = require("../service/borrowerService");

router.get("/", function(req, res) {
  borrowerService
    .findAllBorrowers()
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
  if (!req.body.name || req.body.name.length < 2) {

    branchFormat = {name: "name(length > 2)" }
    return res.status(400).json(branchFormat);
  }

  branch = req.body;

  return borrowerService
    .createBorrower(branch)
    .then(data => res.json(data).status(201))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.put("/", function(req, res) {
  if (!req.body.name || req.body.name.length < 2) {
    return res.sendStatus(400);
  }
  if (!req.body._id) {
    return res.sendStatus(400);
  }

  branch = req.body;

  return borrowerService
    .updateBorrower(branch)
    .then(res.sendStatus(204))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id", function(req, res) {
  id = req.params.id;

  return borrowerService
    .deleteBorrower(id)
    .then(res.sendStatus(204))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
