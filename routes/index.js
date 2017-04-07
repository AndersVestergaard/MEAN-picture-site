var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); 

});

router.get('/hello-world', function(req, res, next) {
  res.render('hello-world', { title: 'Express' });
});

router.get('/proof', function(req, res, next) {
  res.send("Hello World");
});

var proof = require('../controllers/proof');
router.get('/proof2', proof.helloWorld);


module.exports = router;
