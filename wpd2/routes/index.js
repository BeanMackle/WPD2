var express = require('express');
var router = express.Router();
let DAO = require('../routes/model/CourseWork')

let app = express();

/* GET home page. */
router.get('/', function(req, res, next) {

 let db = new DAO('Coursework');

  db.init('Gavin', 'IT WORKED');



  db.all()
   .then((list) => {

                   res.render('index', {title: 'Express', body: JSON.stringify(list)});
                   console.log(list);

      })
      .catch((err) => {
       console.log('Error: ');
       console.log(JSON.stringify(err));

        res.render('index', { title: 'Express', body: 'test'  });
     });

});


module.exports = router;
