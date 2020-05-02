let express = require('express');
var router = express.Router();
let DAO = require('../model/User');
let bcrypt = require('bcryptjs');


router.get('/', function (req,res,next)
{

    res.render('register', {layout: 'layout'});

});


router.post('/', function (req, res)
{
    if(req.body.Password  === ""  || req.body.UserName  === ""  || req.body.ConfirmPassword === "") {

        res.render('register', {error: "Fill out all Fields!", layout: 'layout'});
    }


            if(req.body.Password === req.body.ConfirmPassword)
            {


                let db = new DAO('DB/User.db');

                db.InsertUser(req.body.UserName, req.body.Password).then((success) =>
                {
                    console.log('SUCCESS:' + JSON.stringify(success));

                    res.redirect('/login/1');
                }).catch(function (error) {


                    console.log('blahblah');
                    res.render('register', {error: "User Name Taken!",layout: 'layout'});

                });


            }
            else
                {
                    console.log('blahblah');
                    res.render('register', {error: "Password must match!",layout: 'layout'});
                }



});


module.exports = router;