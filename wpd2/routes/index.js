var express = require('express');
var router = express.Router();


let app = express();

/* GET home page. */
router.get('/', function(req, res, next) {


   if(req.isAuthenticated())
    {
        console.log('AUTH MATE')
        res.render('index', {title: "Upbeak", layout: 'authorisedLayout'});
    }
    else {
        res.render("index", {title: "Upbeak", layout: 'layout'});
    }
       });


module.exports = router;
