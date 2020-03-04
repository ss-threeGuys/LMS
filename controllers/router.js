const express = require('express');
const router = express.Router();


const author = require('./authorController');
const book = require('./bookController');
const borrower = require('./borrowerController');
const branch = require('./branchController');
const genre = require('./genreController');
const publisher = require('./publisherController');

router.use('/author', author);
router.use('/book', book);
router.use('/borrower', borrower);
router.use('/branch', branch);
router.use('/genre', genre);
router.use('/publisher', publisher);

module.exports = router;





