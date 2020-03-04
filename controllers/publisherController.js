const express = require('express'); 
const router = express.Router(); 
const publisherService = require('../service/publisherService');

router.get('/',function(req,res){
  res.send(publisherService.findAllPublishers());
  if (err) throw err;
});

module.exports = router;