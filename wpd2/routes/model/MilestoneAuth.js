module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let milestone = req.params.id;

        let DAO = require('../model/MileStones');
        let db = new DAO('Milestone');

        let cDAO = require('../model/CourseWork');
        let courseDb = new cDAO('Coursework');

        db.FindMileStone(milestone).then((mile) =>
        {
            if(mile != undefined) {
                courseDb.FindCourseWork(mile[0].courseworkId).then((coursework) => {
                    if(coursework.length > 0) {
                        if (coursework[0].Author === req.session.passport.user) {
                            next();
                        } else {
                            res.render('404');
                        }
                    }
                    else
                        {
                            res.render('404');
                        }
                })

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
