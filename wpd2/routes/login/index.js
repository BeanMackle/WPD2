let express = require('express');
let router = express.Router();
let pass = require('passport');
let auth = require("../model/Auth");


router.get('/logout', auth, function (req,res,next) {

    try {
        req.logout();

        res.redirect('/')


    }
    catch(e)
    {
        console.log(e);
    }

})


router.get('/:id', function(req, res, next) {

    try
    {
        let id = req.params.id;

        if(id === 'fail')
        {
            res.render('login', {error: 'Incorrect Login Credentials', title: 'Express', body: 'test', layout: 'layout'});
        }
        else
            {
                res.render('login', {title: 'Express', body: 'test', layout: 'layout'});
            }
    }
    catch
    {
        res.render('login', {title: 'Express', body: 'test', layout: 'layout'});
    }

    //    });

);

router.post('/:id', pass.authenticate('local', {
    successRedirect: '/coursework',
    failureRedirect: '/login/fail',
    failureFlash: true,


}
));



module.exports = router;
