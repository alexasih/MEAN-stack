const express = require('express');
const router = express.Router();
const db = require('../mongo/mongo');


db.connect( (err, client) => {
  if (err) {
    console.log(`ERR: ${err}`);
  }
  else {
    console.log("Connected");
  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/bare', function (req, res, next) {
  let mongo = db.getDB();
  mongo.collection('restaurants').find().toArray(function (err, docs){
    console.log(docs);
    res.send(docs);
  })
});

module.exports = router;



