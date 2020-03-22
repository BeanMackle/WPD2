let express = require('express');
var router = express.Router();
let app = express();


router.get('/', function (req,res,next)
{

    console.log('WORKED');
    res.render('login');

});


router.post('/', function (req, res)
{
  console.log(req.body.UserName);

    console.log('akshjbdgfoahsbdg')
});

router.post('/reg', function (req, res) {
    console.log('Yeet');
 res.reduce('register')
});

module.exports = router;