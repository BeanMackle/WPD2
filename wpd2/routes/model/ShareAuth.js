module.exports = (req, res, next) => {

    if (req.isAuthenticated()) {


        let id = req.params.id;

        if(id.length > 0)
        {
            let DAO = require('../model/CourseWork');
            let db = new DAO('Coursework');

            db.FindCourseWork(id).then((course) =>
            {
                if(course[0].Share === 'true')
                {
                    next();
                }
                else
                {
                    if(req.user[0]._id === course[0].Author)
                    {
                        next();
                    }
                    else {
                        res.status(401).json({msg: 'You are not authorized to view this resource'});
                    }
                }
            });


        }

        next();
    } else {

        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}
