let express = require('express');
let router = express.Router();
let pass = require('passport');
let auth = require("../model/Auth");



router.get('/', function(req, res, next) {


    res.render('login', {title: 'Express', body: 'test', layout: 'layout'});
    //    });

});

router.post('/', pass.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,


}
));



router.get('/logout', auth, function (req,res,next) {


    console.log("IN HERE");

    try {
        req.logout();

        res.redirect('/');
    }
    catch(e)
    {
        console.log(e);
    }

})


module.exports = router;