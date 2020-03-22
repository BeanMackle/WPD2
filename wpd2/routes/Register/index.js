let express = require('express');
var router = express.Router();
let DAO = require('/model/User');


router.get('/', function (req,res,next)
{

    let db = new DAO('User');

    db.init();
    console.log('WORKED');
    res.render('register');

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