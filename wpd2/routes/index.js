var express = require('express');
var router = express.Router();


let app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

            res.render("index");
       });




module.exports = router;
