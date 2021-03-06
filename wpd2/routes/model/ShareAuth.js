module.exports = (req, res, next) => {

    if (req.isAuthenticated()) {


        let id = req.params.id;

        if(id.length > 0)
        {
            let DAO = require('../model/CourseWork');
            let db = new DAO('Coursework');

            db.FindCourseWork(id).then((course) =>
            {
                if(course != undefined) {
                    console.log(course);
                    if (course[0].Share === 'true') {
                        next();
                    } else {
                        if (req.session.passport.user === course[0].Author) {
                            next();
                        } else {
                            res.render('401', { title: "Upbeak"});
                        }
                    }
                }
                else
                {
                    res.render('404', { title: "Upbeak"});
                }});

        }
        else
        {
            res.render('404', { title: "Upbeak"});
        }


    }
    else
    {
        res.render('401', { title: "Upbeak"});
    }

}