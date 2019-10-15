const express = require('express');
const router = express.Router();
const pug = require('pug');
const compiledFunction = pug.compileFile('views/ps3.pug');

router.route('/')
    .get(function (req, res, next) {
        //vars on query string req.query
        res.send(compiledFunction({
            name: 'Hey now!'
        }));

    })
    .post(function (req, res, next) {
        //vars on req.body
        // res.send(`Bar has the value ${req.body.bar}`);
        res.send(compiledFunction({
            name: 'Text: ' + req.body.stringy,
            lengthOfName: 'Length of text: ' + req.body.stringy.length
        }));
    });

module.exports = router;

