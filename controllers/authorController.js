const express = require('express');
const router = express.Router();
const authorService = require('../service/authorService')

router.get('/', function (req, res, next) {
  authorService.findAllAuthors()
    .then((data) => {
      res.json(data)
    }).catch(next)
  });

router.post('/', function (req, res, next) {
  if (!req.body.name || req.body.name.length < 2) {
    return res.status(400).json({"message" : "invalid input - name must be at least 2 characters"});
  }
  author = req.body;
  return authorService.createAuthor(author)
    .then(data => res.json(data).status(201))
    .catch(next);
})

router.put('/', function (req, res, next) {
  console.log(req.body)
  if (!req.body.name || req.body.name.length < 2 || !req.body._id) {
    return res.status(400).json({"message" : "invalid input - name must be at least 2 characters"});
  }
  
  author = req.body;
  console.log(author);
  return authorService.updateAuthor(author)
  .then(res.sendStatus(204))
  .catch(next)
})

router.delete('/:id', function(req, res, next) {
  id = req.params.id;
  return authorService.deleteAuthor(id)
  .then(res.sendStatus(204))
  .catch(next)

})

module.exports = router;