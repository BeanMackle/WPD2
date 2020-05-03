module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let milestone = req.params.id;

        let DAO = require('../model/MileStones');
        let db = new DAO('MileStones');

        let cDAO = require('../model/CourseWork');
        let courseDb = new cDAO('Coursework');

        db.FindMileStone(milestone).then((mile) =>
        {
            if(mile.length > 0) {
                courseDb.FindCourseWork(mile[0].courseworkId).then((coursework) => {
                    if(coursework.length > 0) {
                        if (coursework[0].Author === req.user[0]._id) {
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
