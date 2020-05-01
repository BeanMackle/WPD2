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

        console.log(req.user[0]._id);


        try {
            db.FindCourseWorks(req.user[0]._id).then((list) => {
                console.log(list);


                res.render('coursework', {coursework: list, listExists: true, layout : 'authorisedLayout'});

            });
        }
        catch(e)
        {

            res.render('coursework', {listExists: false, layout : 'authorisedLayout'});
        }





});

router.get('/create', auth, function (req, res, next) {

    res.render('create', {layout : 'authorisedLayout'});

});

router.post('/create', auth, function (req, res, next) {

    if(req.body.Title.length  && req.body.Module.length  && req.body.DueDate.length > 0)
    {

            db.insert(req.body.Title, req.body.Module, req.user[0]._id, req.body.DueDate, 'null');

            db.FindCourseWorks(req.user[0]._id).then((list) => {
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
        res.render('create', {layout : 'authorisedLayout', error : 'All Fields but Completion Date must be Entered!'});

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
               res.render("AddMileStone", {milestone : miles, listExists : true, title : work[0].Title, layout : 'authorisedLayout'});
           }
           else
               {
                   res.render("AddMileStone", {listExists : false, title : work[0].Title, layout : 'authorisedLayout'});
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
                    res.render("AddMileStone", {error: 'Field Must not be Empty',milestone : miles, listExists : true, title : work[0].Title, layout : 'authorisedLayout'});
                }
                else
                {
                    res.render("AddMileStone", {error: 'Field Must not be Empty', listExists : false, title : work[0].Title, layout : 'authorisedLayout'});
                }
            });
        });
    }
    else
        {

            mileDb.insert(req.body.MileStone, id);

            res.redirect("/coursework/addmilestone/" + id);

        }



});


router.get('/modify/:id',  CourseworkAuth, function (req, res, next) {

    let id = req.params.id;

    db.FindCourseWork(id).then((course) =>
    {
        mileDb.FindMileStoneForCoursework(id).then((mile) =>
        {
            if(mile.length > 0)
            {
                console.log(mile);
                if(req.user[0]._id != course[0].Author)
                {
                    res.render('modifyCoursework', {layout : 'authorisedLayout', Module : course[0].Module, courseId : course[0]._id, Title : course[0].Title, DueDate: course[0].DueDate, Author: course[0].Author,CompletionDate: course[0].CompletionDate, listExists : true, milestone : mile})
                }
                res.render('modifyCoursework', {layout : 'authorisedLayout' , Module : course[0].Module, courseId : course[0]._id , Title : course[0].Title, DueDate: course[0].DueDate,CompletionDate: course[0].CompletionDate , listExists : true, milestone : mile})
            }

            if(req.user[0]._id != course[0].Author) {

                res.render('modifyCoursework', {
                    Module: course[0].Module,
                    courseId : course[0]._id,
                    Title: course[0].Title,
                    DueDate: course[0].DueDate,
                    Author : course[0].Author,
                    CompletionDate: course[0].CompletionDate ,
                    listExists : false,
                    layout : 'authorisedLayout'
                });
            }
            else
            {
                res.render('modifyCoursework', {
                    Module: course[0].Module,
                    courseId : course[0]._id,
                    Title: course[0].Title,
                    DueDate: course[0].DueDate,
                    CompletionDate: course[0].CompletionDate ,
                    listExists : false,
                    layout : 'authorisedLayout'
                });
            }

        })
    })



});

router.post('/modify/:id', CourseworkAuth, function (req, res, next) {

    let id = req.params.id;

    if(req.body.Title == null || req.body.Module == null || req.body.DueDate == null)
    {
        res.redirect("/coursework/modify/" + id);
    }
    else
        {
            db.UpdateCourseWork(id, req.body.Title, req.body.Module, req.user[0]._id, req.body.DueDate, req.body.CompletionDate).catch(function (error) {
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
               res.render('modifyMilestone', {false: 'selected', Milestone: mile[0].Name, layout: 'authorisedLayout'});
           }
           else
               {
                   res.render('modifyMilestone', {true: 'selected',Milestone: mile[0].Name, layout: 'authorisedLayout'});
               }
       }
       else
           {
               res.status(404).json({ msg: 'Resource Not Found' });
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
                    res.render('modifyMilestone', {Milestone : mile[0].Name, layout : 'authorisedLayout'})
                }
                else
                {
                    res.status(404).json({ msg: 'Resource Not Found' });
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

            if(mile.length > 0)
            {
                if(req.user[0]._id != course[0].Author)
                {
                    res.render('viewcoursework', {Module : course[0].Module, Title : course[0].Title, DueDate: course[0].DueDate, Author: course[0].Author,CompletionDate: course[0].CompletionDate ,listExists : true, milestone : mile, layout : 'authorisedLayout'})
                }
                res.render('viewcoursework', {Module : course[0].Module, Title : course[0].Title, DueDate: course[0].DueDate, CompletionDate: course[0].CompletionDate , listExists : true, milestone : mile, layout : 'authorisedLayout'})
            }

            if(req.user[0]._id != course[0].Author) {

                res.render('viewcoursework', {
                    Module: course[0].Module,
                    Title: course[0].Title,
                    DueDate: course[0].DueDate,
                    CompletionDate: course[0].CompletionDate,
                    Author : course[0].Author,
                    listExists : false
                });
            }
            else
                {
                    res.render('viewcoursework', {
                        Module: course[0].Module,
                        Title: course[0].Title,
                        DueDate: course[0].DueDate,
                        CompletionDate: course[0].CompletionDate,
                        listExists : false,
                        layout : 'authorisedLayout'
                    });
                }
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
        db.DeleteCourseWork(id);
    });

    res.redirect('/coursework');



});

router.post('/share/:id', CourseworkAuth, function (req,res,next) {



});

module.exports = router;