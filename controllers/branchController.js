"use strict";
const express = require("express");
var convert = require("xml-js");
const router = express.Router();
const branchService = require("../service/branchService");

router.get("/", function(req, res, next) {
  branchService
    .findAllBranches()
    .then(data => {
      res.format({
        "application/json": () => res.json(data),
        "application/xml": () => {
          const xml = convertJSONtoXML(JSON.stringify(data));
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

  branch = req.body;

  return branchService
    .createBranch(branch)
    .then(data => res.status(201).json(data))
    .catch(next);
});

router.put("/:id", function(req, res, next) {
  if (!req.body.branchName || req.body.branchName.length < 2) {
    return res.sendStatus(400);
  }
  id = req.params.id;
  branch = req.body;

  return branchService
    .updateBranch(id, branch)
    .then(res.sendStatus(204))
    .catch(next);
});

router.delete("/:id", function(req, res, next) {
  id = req.params.id;

  return branchService
    .deleteBranch(id)
    .then(res.sendStatus(204))
    .catch(next);
});

const convertJSONtoXML = json => {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  let xml = `<Branches> ${convert
    .json2xml(json, options)
    .replace(/\d>/g, "Branch>")} </Branches>`;

  return xml;
};

module.exports = router;
