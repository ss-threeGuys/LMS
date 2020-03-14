const express = require("express");
const router = express.Router();

const author = require("./authorController");
const book = require("./bookController");
const borrower = require("./borrowerController");
const branch = require("./branchController");
const genre = require("./genreController");
const publisher = require("./publisherController");

router.use("/authors", author);
router.use("/books", book);
router.use("/borrowers", borrower);
router.use("/branches", branch);
router.use("/genres", genre);
router.use("/publishers", publisher);

module.exports = router;
