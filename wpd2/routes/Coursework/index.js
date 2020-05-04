let express = require('express');
let router = express.Router();
let pass = require('passport');
let auth = require("../model/Auth");
let shareAuth = require('../model/ShareAuth');
let CourseworkAuth = require('../model/CourseworkAuth');
let MilestoneAuth = require('../model/MilestoneAuth');
let DAO = require('../model/CourseWork')
let handle = require('handlebars');
const fs = require('fs');
let mileDAO = require('../model/MileStones')


let db = new DAO('Coursework');
let mileDb = new mileDAO('MileStones');

router.get('/',auth, function(req, res, next) {




        try {
            db.FindCourseWorks(req.session.passport.user).then((list) => {
                console.log(list);
                let toDisplay = '';
                let listExists = '';
                if(list.length > 0) {
                  toDisplay = list;
                  listExists = true;
                }
                else
                    {
                         toDisplay = null;
                        listExists = false;
                    }

                res.render('coursework', {title: "Upbeak",coursework: toDisplay, listExists: listExists, layout : 'authorisedLayout'});

            });
        }
        catch(e)
        {

            res.render('coursework', {title: "Upbeak",listExists: false, layout : 'authorisedLayout'});
        }





});

router.get('/create', auth, function (req, res, next) {

    res.render('create', {title: "Upbeak",layout : 'authorisedLayout'});

});

router.post('/create', auth, function (req, res, next) {


    if(req.body.Title.length  && req.body.Module.length  && req.body.DueDate.length > 0)
    {

            db.insert(req.body.Title, req.body.Module, req.session.passport.user, req.body.DueDate, 'null');

            db.FindCourseWorks(req.session.passport.user).then((list) => {
                console.log(list);

                for(i = 0; i < list.length; i++)
                {
                    if(list[i].Title === req.body.Title)
                    {

                        res.redirect("addmilestone/" + list[i]._id);

                    }
                }

            });



    }
    else
    {
        res.render('create', {layout : 'authorisedLayout', error : 'All Fields but Completion Date must be Entered!', title: "Upbeak" });

    }



});

router.get('/addmilestone/:id', CourseworkAuth, function(req,res,next)
{
   let id = req.params.id;

   console.log(id);
    db.FindCourseWork(id).then((work) =>
    {
       mileDb.FindMileStoneForCoursework(id).then((miles) => {

           if(miles.length > 0)
           {
               res.render("AddMileStone", {newCoursework : id ,milestone : miles, listExists : true, name : work[0].Title, layout : 'authorisedLayout', title: "Upbeak", id : work[0]._id});
           }
           else
               {
                   res.render("AddMileStone", {newCoursework : id,listExists : false, name : work[0].Title, layout : 'authorisedLayout', title: "Upbeak",  id : work[0]._id});
               }
       });
    });

});


router.post('/addmilestone/:id', CourseworkAuth, function(req,res,next)
{

    let id = req.params.id;

    console.log('yes' + req.body.MileStone);
    if(req.body.MileStone.length == "")
    {
        db.FindCourseWork(id).then((work) =>
        {
            mileDb.FindMileStoneForCoursework(id).then((miles) => {

                if(miles.length > 0)
                {
                    res.render("AddMileStone", { id : work[0]._id, error: 'Field Must not be Empty',milestone : miles, listExists : true, name : work[0].Title, layout : 'authorisedLayout', title: "Upbeak"});
                }
                else
                {
                    res.render("AddMileStone", { id : work[0]._id, error: 'Field Must not be Empty', listExists : false, name : work[0].Title, layout : 'authorisedLayout', title: "Upbeak"});
                }
            });
        });
    }
    else
        {
            if(req.body.Finished === false || req.body.Finished === "false")
            {
                mileDb.insert(req.body.MileStone, id, false);
            }
            else
                {
                    mileDb.insert(req.body.MileStone, id, true);
                }



            res.redirect("/coursework/addmilestone/" + id);

        }



});


router.get('/modify/:id',  CourseworkAuth, function (req, res, next) {

    let id = req.params.id;

    db.FindCourseWork(id).then((course) =>
    {
        mileDb.FindMileStoneForCoursework(id).then((mile) =>
        {
            let milestones ='';
            let exists = false;
            if(mile.length > 0) {
                milestones = mile;
                exists = true;
                console.log(mile);

            }

            res.render('modifyCoursework', {layout : 'authorisedLayout', Module : course[0].Module, courseId : course[0]._id, Title : course[0].Title, DueDate: course[0].DueDate, Author: course[0].Author,CompletionDate: course[0].CompletionDate, listExists : exists, milestone : milestones, title: "Upbeak"})


        })


        })




});

router.post('/modify/:id', CourseworkAuth, function (req, res, next) {

    let id = req.params.id;

    if(req.body.Title.length === 0 || req.body.Module.length === 0 || req.body.DueDate.length === 0)
    {
        db.FindCourseWork(id).then((course) =>
        {
            mileDb.FindMileStoneForCoursework(id).then((mile) =>
            {
                let milestones ='';
                let exists = false;
                if(mile.length > 0) {
                    milestones = mile;
                    exists = true;
                    console.log(mile);

                }

                res.render('modifyCoursework', {layout : 'authorisedLayout',error: "Please enter All Fields", Module : course[0].Module, courseId : course[0]._id, Title : course[0].Title, DueDate: course[0].DueDate, Author: course[0].Author,CompletionDate: course[0].CompletionDate, listExists : exists, milestone : milestones, title: "Upbeak"})


            })


        })

    }
    else
        {
            db.UpdateCourseWork(id, req.body.Title, req.body.Module, req.session.passport.user, req.body.DueDate, req.body.CompletionDate).catch(function (error) {
                res.send(error);

            });


            res.redirect("/coursework/view/" + id);

        }



});

router.get('/modify/modifymile/:id', MilestoneAuth, function(req,res,next)
{
   let id = req.params.id;

   console.log('here');

   mileDb.FindMileStone(id).then((mile) =>
   {
       if(mile.length > 0)
       {
           if(mile[0].Finished == false) {
               res.render('modifyMilestone', {false: 'selected', Milestone: mile[0].Name, layout: 'authorisedLayout', title: "Upbeak"});
           }
           else
               {
                   res.render('modifyMilestone', {true: 'selected',Milestone: mile[0].Name, layout: 'authorisedLayout', title: "Upbeak"});
               }
       }
       else
           {
               res.render('404', { title: "Upbeak"});
           }
   })
});

router.post('/modify/modifymile/:id', MilestoneAuth, function (req,res,next) {

    let id = req.params.id;

    console.log('CHECKBOX: ' + req.body.Finished);

    if(req.body.Milestone.length > 0)
    {
        if(req.body.Finished === false || req.body.Finished === "false") {


            mileDb.UpdateMilestone(id, req.body.Milestone, false);
        }
        else
            {
                mileDb.UpdateMilestone(id, req.body.Milestone, true);
            }

        mileDb.FindMileStone(id).then((mile) =>
        {
            res.redirect('/coursework/modify/' + mile[0].courseworkId);

        })


    }
    else
        {

            mileDb.FindMileStone(id).then((mile) =>
            {
                if(mile.length > 0)
                {
                    res.render('modifyMilestone', {error : "Please Fill Out the Field!", Milestone : mile[0].Name, layout : 'authorisedLayout', title: "Upbeak"})
                }
                else
                {
                    res.render('404', { title: "Upbeak"});
                }
            })
        }

});

router.get('/view/:id', shareAuth, function (req,res,next)
{

    let id = req.params.id;

    db.FindCourseWork(id).then((course) =>
    {
        mileDb.FindMileStoneForCoursework(id).then((mile) =>
        {
            console.log('we here');
            console.log(course);
            console.log(mile);

            let share ='';
            let deshare ='';

            if(mile != undefined)
            {
                if(course[0].CompletionDate === 'null')
                {
                    course[0].CompletionDate = 'Ongoing';
                }
                if(req.session.passport.user === course[0].Author)
                {
                    share = 'none';
                    deshare = 'block';
                    if(course[0].Share === 'true') {

                    }
                    else
                        {
                            share = 'block';
                            deshare = 'none';

                        }
                }

                if(req.session.passport.user != course[0].Author && course[0].Share === 'true')
                {
                    share = 'none';
                    deshare = 'none';

                }

                res.render('viewcoursework', {
                    share: share,
                    deshare : deshare,
                    coursework: course[0]._id,
                    Module: course[0].Module,
                    Title: course[0].Title,
                    DueDate: course[0].DueDate,
                    CompletionDate: course[0].CompletionDate,
                    listExists: true,
                    milestone: mile,
                    layout: 'authorisedLayout',
                    title: "Upbeak"
                })


            }


        }).catch(function(e)
        {
            res.render('404', { title: "Upbeak"});
        })
    })
});

router.get('/modify/deletemile/:id', MilestoneAuth, function (req,res,next) {


    let id = req.params.id;

    console.log('IN HERE');
    mileDb.FindMileStone(id).then((mile) =>
    {
        mileDb.DeleteMileStone(id).then((success)=>
        {
            res.redirect('/coursework/modify/' + mile[0].courseworkId);
        });

    })

});

router.get('/delete/:id', CourseworkAuth, function (req,res,next) {

    let id = req.params.id;

    mileDb.DeleteAllMilestonesForCoursework(id).then((success) =>
    {
        db.DeleteCourseWork(id).then((succ) =>
        {
            console.log(succ);
        }).catch(console.log("oh dear"));
    });

    res.redirect('/coursework');



});

router.post('/share/:id', CourseworkAuth, function (req,res,next) {

    let id = req.params.id;


    try
    {
        db.UpdateShareCoursework(id, 'true').then((success) =>
        {
            if(success === 1)
            {
                res.send('true');
            }
            else
                {
                    res.send('false');
                }
        })
    }
    catch(e)
    {   console.log(e);
        res.send('false');

    }

});
router.post('/deshare/:id', CourseworkAuth, function (req,res,next) {

    let id = req.params.id;


    try
    {
        db.UpdateShareCoursework(id, 'false').then((success) =>
        {
            if(success === 1)
            {
                res.send('true');
            }
            else
                {
                    res.send('false');
                }
        })
    }
    catch
    {
        res.send('false');

    }

});

module.exports = router;