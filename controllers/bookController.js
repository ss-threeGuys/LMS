const express = require('express');
const router = express.Router();
const bookService = require('../service/bookService');

router.get('/', function (req, res, next) {
  bookService.findAllBooks()
    .then((data) => {
      res.json(data)
    }).catch(next)
});

router.post('/', function (req, res, next) {
  if (!req.body.title || req.body.title.length < 2) {
    return res.status(400).json({ "message": "invalid input - title must be at least 2 characters" });
  }
  book = req.body;
  console.log(book);
 bookService.createBook(book)
    .then(data => {
      console.log('book after create book: ' + data);
      return res.status(201).json(data);
    })
    .catch(err => {
      console.log("error after createBook"+ err);
      next(err);
    })
});

router.put('/', function (req, res, next) {
  console.log(req.body)
  if (!req.body.title || req.body.title.length < 2 || !req.body._id) {
    return res.status(400).json({ "message": "invalid input - title must be at least 2 characters" });
  }

  book = req.body;
  console.log(author);
  return bookService.updateBook(book)
    .then(res.sendStatus(204))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  id = req.params.id;
  return bookService.deleteBook(id)
    .then(res.sendStatus(204))
    .catch(next)

})

module.exports = router;