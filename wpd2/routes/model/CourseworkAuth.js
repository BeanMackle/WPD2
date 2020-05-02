module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let coursework = req.params.id;

        let DAO = require('../model/CourseWork');
        let db = new DAO('Coursework');

        db.FindCourseWork(coursework).then((course) =>
        {
            console.log(req.user[0]._id);
            if(course.length > 0) {
                if (course[0].Author === req.user[0]._id) {
                    next();
                } else {
                    res.render('401');
                }
            }
            else
                {
                    res.render('404');
                }
        });
    } else {
        res.render('401');
    }
}
