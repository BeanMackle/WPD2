module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {

        let milestone = req.params.id;

        let DAO = require('../model/MileStones');
        let db = new DAO('MileStones');

        let cDAO = require('../model/CourseWork');
        let courseDb = new cDAO('Coursework');

        db.FindMileStone(milestone).then((mile) =>
        {
                courseDb.FindCourseWork(mile[0].courseworkId).then((coursework) =>
                {
                    if(coursework[0].Author === req.user[0]._id)
                    {
                        next();
                    }
                    else
                    {
                        res.status(401).json({ msg: 'You are not authorized to modify this resource' });
                    }
                })

        });
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}
