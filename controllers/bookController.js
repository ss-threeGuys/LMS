const express = require("express");
const router = express.Router();
const bookService = require("../service/bookService");
const utilities = require("../utilities/utilities");

router.get("/", function(req, res, next) {
  bookService
    .findAllBooks()
    .then(data => {
      res.format({
        "application/json": () => res.json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Book",
            "Books"
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
  if (!req.body.title || req.body.title.length < 2) {
    return res
      .status(400)
      .json({ message: "invalid input - title must be at least 2 characters" });
  }
  book = req.body;
  console.log(book);
  bookService
    .createBook(book)
    .then(data => {
      res.format({
        "application/json": () => res.status(201).json(data),
        "application/xml": () => {
          const xml = utilities.convertJSONtoXML(
            JSON.stringify(data),
            "Book",
            null
          );
          res.setHeader("Content-Type", "application/xml");
          res.status(201);
          res.send(xml);
        },

        default: () => res.status(406).send("Not Acceptable")
      });
    })
    .catch(err => {
      console.log("error after createBook" + err);
      next(err);
    });
});

router.put("/:id", function(req, res, next) {
  if (req.params.id !== req.body._id) {
    return res.sendStatus(400);
  }
  if (!req.body.title || req.body.title.length < 2 || !req.body._id) {
    return res.status(400).json({
      message:
        "invalid input - title must be at least 2 characters and must include an id to update"
    });
  }

  book = req.body;

  return bookService
    .updateBook(book)
    .then(res.sendStatus(204))
    .catch(next);
});

router.delete("/:id", function(req, res, next) {
  id = req.params.id;
  return bookService
    .deleteBook(id)
    .then(res.sendStatus(204))
    .catch(next);
});

module.exports = router;
