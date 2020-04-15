let express = require('express');
let router = express.Router();
let pass = require('passport');
let auth = require("../model/Auth");
let DAO = require('../model/CourseWork')


let db = new DAO('Coursework');

router.get('/',auth, function(req, res, next) {

        console.log(req.user[0]._id);

    res.render('coursework', {title: 'Express', body: 'test'});

});

module.exports = router;