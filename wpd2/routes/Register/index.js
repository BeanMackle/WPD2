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
    if(req.body.Password.length  && req.body.UserName.length  && req.body.ConfirmPassword.length > 0) {


        try {
            if(req.body.Password === req.body.ConfirmPassword)
            {
                console.log('blahblah');

                let db = new DAO('User');

                db.InsertUser(req.body.UserName, req.body.Password).catch(function (error) {

                    res.redirect('../login');

                });


            }
            else
                {
                    res.render('register', {error: "Password must match!",layout: 'layout'});
                }




        } catch {
            res.render('register', {error: "User Name Taken!",layout: 'layout'});

        }
    }
    console.log('YOU SUCK');
    res.render('./register', {error: "An Error has Occured! Please Ensure all fields are filled out",layout: 'layout'});

});


module.exports = router;