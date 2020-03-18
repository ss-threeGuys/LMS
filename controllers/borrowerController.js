const express = require("express");
const router = express.Router();
const borrowerService = require("../service/borrowerService");
const utilities = require("../utilities/utilities");
const paginationPlugin = require("./paginateControlerPlugin");

paginationPlugin(router, borrowerService);

router.get("/", function(req, res, next) {
  borrowerService
    .findAllBorrowers()
    .then(data => {
      res.format({
        "application/json": () => res.json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Borrower",
            "Borrowers"
          );
          res.setHeader("Content-Type", "application/xml");
          res.status(200);
          res.send(xml);
        },

        default: () => res.status(406).send("Not Acceptable")
      });
    })
    .catch(next);
});

router.post("/", function(req, res, next) {
  if (!req.body.name || req.body.name.length < 2) {
    branchFormat = { name: "name(length > 2)" };
    return res.status(400).json(branchFormat);
  }

  let branch = req.body;

  return borrowerService
    .createBorrower(branch)
    .then(data => {
      res.format({
        "application/json": () => res.status(201).json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Borrower",
            null
          );
          res.setHeader("Content-Type", "application/xml");
          res.status(201);
          res.send(xml);
        },

        default: () => res.status(406).send("Not Acceptable")
      });
    })
    .catch(next);
});

router.put("/:id", function(req, res, next) {
  if (req.params.id !== req.body._id) {
    return res.sendStatus(400);
  }
  if (!req.body.name || req.body.name.length < 2) {
    return res.sendStatus(400);
  }

  let id = req.params.id;
  let borrower = req.body;

  return borrowerService
    .updateBorrower(id, borrower)
    .then(res.sendStatus(204))
    .catch(next);
});

router.delete("/:id", function(req, res, next) {
  let id = req.params.id;

  return borrowerService
    .deleteBorrower(id)
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
