module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let coursework = req.params.id;

        let DAO = require('../model/CourseWork');
        let db = new DAO('Coursework');

        db.FindCourseWork(coursework).then((course) =>
        {

            if(course[0].Author === req.user[0]._id)
            {
                next();
            }
            else
                {
                    res.status(401).json({ msg: 'You are not authorized to modify this resource' });
                }
        });
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}
