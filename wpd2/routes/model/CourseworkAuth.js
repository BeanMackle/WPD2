module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let coursework = req.params.id;

        let DAO = require('../model/CourseWork');
        let db = new DAO('Coursework');

        db.FindCourseWork(coursework).then((course) =>
        {

            if(course.length > 0) {
                if (course[0].Author === req.session.passport.user) {
                    next();
                } else {
                    res.render('401', { title: "Upbeak"});
                }
            }
            else
                {
                    res.render('404', { title: "Upbeak"});
                }
        });
    } else {
        res.render('401', { title: "Upbeak"});
    }
}
