const express = require("express");
const router = express.Router();
const borrowerService = require("../service/borrowerService");

router.get("/", function(req, res, next) {
  borrowerService
    .findAllBorrowers()
    .then(data => {
      res.json(data);
    })
    .catch(next)
});

router.post("/", function(req, res, next) {
  if (!req.body.name || req.body.name.length < 2) {

    branchFormat = {name: "name(length > 2)" }
    return res.status(400).json(branchFormat);
  }

  branch = req.body;

  return borrowerService
    .createBorrower(branch)
    .then(data => res.json(data).status(201))
    .catch(next)
});

router.put("/", function(req, res, next) {
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
    .catch(next)
});

router.delete("/:id", function(req, res, next) {
  id = req.params.id;

  return borrowerService
    .deleteBorrower(id)
    .then(res.sendStatus(204))
    .catch(next)
});

module.exports = router;
