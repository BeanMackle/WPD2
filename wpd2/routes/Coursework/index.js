let express = require('express');
let router = express.Router();
let pass = require('passport');
let auth = require("../model/Auth");



router.get('/',auth, function(req, res, next) {


    res.render('coursework', {title: 'Express', body: 'test'});

});

module.exports = router;