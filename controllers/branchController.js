"use strict";
const express = require("express");

const router = express.Router();
const branchService = require("../service/branchService");
const utilities = require("../utilities/utilities");
const paginationPlugin = require("./paginateControlerPlugin");

paginationPlugin(router, branchService);

router.get("/", function(req, res, next) {
  branchService
    .findAllBranches()
    .then(data => {
      res.format({
        "application/json": () => res.json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Branch",
            "Branches"
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
  if (!req.body.branchName || req.body.branchName.length < 2) {
    branchFormat = { branchName: "branchName (required and length > 2)" };
    return res.status(400).json(branchFormat);
  }

  let branch = req.body;

  return (
    branchService
      .createBranch(branch)
      .then(data => {
        res.format({
          "application/json": () => res.status(201).json(data),
          "application/xml": () => {
            const xml = utilities.convertJSONtoXML(
              JSON.stringify(data),
              "Branch",
              null
            );
            res.setHeader("Content-Type", "application/xml");
            res.status(201);
            res.send(xml);
          },

          default: () => res.status(406).send("Not Acceptable")
        });
      })
      //res.status(201).json(data))
      .catch(next)
  );
});

router.put("/:id", function(req, res, next) {
  if (req.params.id !== req.body._id) {
    return res.sendStatus(400);
  }
  if (!req.body.branchName || req.body.branchName.length < 2) {
    return res.sendStatus(400);
  }
  let id = req.params.id;
  let branch = req.body;

  return branchService
    .updateBranch(id, branch)
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.delete("/:id", function(req, res, next) {
  let id = req.params.id;

  return branchService
    .deleteBranch(id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
