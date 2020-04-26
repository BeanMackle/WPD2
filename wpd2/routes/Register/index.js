let express = require('express');
var router = express.Router();
let DAO = require('../model/User');
let bcrypt = require('bcryptjs');


router.get('/', function (req,res,next)
{

    let db = new DAO('User');

    db.init();
    console.log('WORKED');
    res.render('register', {layout: 'layout'});

});


router.post('/', function (req, res)
{
    if(req.body.Password && req.body.UserName && req.body.ConfirmPassword !== null) {
        try {
            if(req.body.Password !== req.body.ConfirmPassword)
            {
                res.redirect('register');
            }


            let db = new DAO('User');

            db.InsertUser(req.body.UserName, req.body.Password);

            console.log(req.body.UserName);

            console.log('akshjbdgfoahsbdg');

            res.redirect('login');
        } catch {
            res.redirect('register')

        }
    }
});


module.exports = router;