var express = require('express');
var router = express.Router();


let app = express();

/* GET home page. */
router.get('/', function(req, res, next) {


   if(req.isAuthenticated())
    {
        console.log('AUTH MATE')
        res.render('index', {layout: 'authorisedLayout', title: 'Upbeak'});
    }
    else {
        res.render("index", {layout: 'layout', title: 'Upbeak'});
    }
       });


module.exports = router;
