const express = require('express');
const router = express.Router();
const authorService = require('../service/authorService')

router.get('/', function (req, res) {
  authorService.findAllAuthors()
    .then((data) => {
      res.json(data)
    }).catch(err => {
      console.errror(err);
    })
});

router.post('/', function (req, res) {
  if (!req.body.name || req.body.name.length < 2) {
    return res.status(400);
  }
  author = req.body;
  return authorService.createAuthor(author)
    .then(data => res.json(data).status(201))
    .catch(err => console.error(err));
})

router.put('/', function (req, res) {
  console.log(req.body)
  if (!req.body.name || req.body.name.length < 2) {
    return res.status(400);
  }
  if (!req.body._id) {
    return res.status(400)
  }
  
  author = req.body;
  console.log(author);
  return authorService.updateAuthor(author)
  .then(res.sendStatus(204))
  .catch(err => console.error(err))
})

router.delete('/:id', function(req, res) {
  id = req.params.id;
  return authorService.deleteAuthor(id)
  .then(res.sendStatus(204))
  .catch(err => console.err(err))

})

module.exports = router;