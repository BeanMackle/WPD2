module.exports = (req, res, next) => {

    if (req.isAuthenticated()) {


        next();
    } else {

        res.render('401', { title: "Upbeak"});
    }
}
