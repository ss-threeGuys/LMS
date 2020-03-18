const express = require("express");
const router = express.Router();
const authorService = require("../service/authorService");
const utilities = require("../utilities/utilities");
const paginationPlugin = require("./paginateControlerPlugin");

paginationPlugin(router, authorService);

router.get("/", function(req, res, next) {
  authorService
    .findAllAuthors()
    .then(data => {
      res.format({
        "application/json": () => res.json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Author",
            "Authors"
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
    return res
      .status(400)
      .json({ message: "invalid input - name must be at least 2 characters" });
  }
  author = req.body;

  return authorService
    .createAuthor(author)
    .then(data => {
      res.format({
        "application/json": () => res.status(201).json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Author",
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
  if (!req.body.name || req.body.name.length < 2 || !req.body._id) {
    return res.status(400).json({
      message:
        "invalid input - name must be at least 2 characters and must have id"
    });
  }

  author = req.body;

  return authorService
    .updateAuthor(author)
    .then(res.sendStatus(204))
    .catch(next);
});

router.delete("/:id", function(req, res, next) {
  id = req.params.id;
  return authorService
    .deleteAuthor(id)
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
