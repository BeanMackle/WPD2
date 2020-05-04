let DAO_course = require('../routes/model/CourseWork');
let DAO = require('../routes/model/User');
let mileDAO = require('../routes/model/MileStones')


let db_course = new DAO_course('Coursework');
let mileDb = new mileDAO('MileStones');
let db = new DAO('User');



const assert = require('assert');
describe('Simple User Inserting Test', () => {
    it('Should Find New User known as "UnitTest1"', () => {
        db.InsertUser("UnitTest1", "UnitTest");

      db.findUser("UnitTest1").then((user) =>
        {
            assert(user[0]._id, "UnitTest1");
        });





    });
    it('Should Find New User known as "UnitTest2"', () => {
        db.InsertUser("UnitTest2", "UnitTest");

        db.findUser("UnitTest2").then((user) =>
        {
            assert(user[0]._id, "UnitTest2");
        });
    });
});

describe('Create Coursework For each Test User', () => {

    it('Should Find New Coursework Created for User "UnitTest1" and add a milestone', () => {
        db_course.insert("Test", "Unit", "UnitTest1", "10-04-2020", null);

        db_course.FindCourseWorks("UnitTest1").then((course) => {
            assert(course[0].Author, "UnitTest1");

            mileDb.insert('TestStone', course[0]._id, "uncompleted");

            mileDb.FindMileStoneForCoursework(course[0]._id).then((mile) =>
            {
                assert(mile[0].courseworkId, course[0]._id);
                assert(mile[0].Name, "TestStone");
            })


        });


    });
    it('Should Find New Coursework Created for User "UnitTest2" and add a milestone', () => {
        db_course.insert("Test", "Unit", "UnitTest2", "10-04-2020", null);

        db_course.FindCourseWorks("UnitTest2").then((course) => {
            assert(course[0].Author, "UnitTest2");
            mileDb.insert('TestStone', course[0]._id, "uncompleted");

            mileDb.FindMileStoneForCoursework(course[0]._id).then((mile) =>
            {
                assert(mile[0].courseworkId, course[0]._id);
                assert(mile[0].Name, "TestStone");
            });
        });
    });
});

describe('Tests modifying Milestones and Coursework', () => {

    it('Verify that coursework belonging to "UnitTest1" can be modified including milestones', () => {

        db_course.FindCourseWorks("UnitTest1").then((course) =>
        {
            mileDb.FindMileStoneForCoursework(course[0]._id).then((mile) =>
            {
                mileDb.UpdateMilestone(mile[0]._id, "TestChange", "Completed").then((success) =>
                    {
                        db_course.UpdateCourseWork(course[0]._id, "TestChange", "TestModule", "UnitTest1", "11-04-2020", null).then((suc) =>
                        {
                            db_course.FindCourseWork(course[0]._id).then((newCourse) =>
                            {
                                assert(newCourse[0].title, "TestChange");

                                mileDb.FindMileStoneForCoursework(course[0]._id).then((newMile) =>
                                {
                                    assert(newMile[0].Name, "TestChange");
                                })
                            })
                        });
                    });
            })
        });


    });

    it('Verify that coursework belonging to "UnitTest2" can be modified including milestones', () => {
        db_course.FindCourseWorks("UnitTest2").then((course) => {
            mileDb.FindMileStoneForCoursework(course[0]._id).then((mile) => {
                mileDb.UpdateMilestone(mile[0]._id, "TestChange", "Completed").then((success) => {
                    db_course.UpdateCourseWork(course[0]._id, "TestChange", "TestModule", "UnitTest2", "11-04-2020", null).then((suc) => {
                        db_course.FindCourseWork(course[0]._id).then((newCourse) => {
                            assert(newCourse[0].title, "TestChange");

                            mileDb.FindMileStoneForCoursework(course[0]._id).then((newMile) => {
                                assert(newMile[0].Name, "TestChange");
                            })
                        })
                    });
                });
            })
        });
    });
});

describe('Tests Ensuring that Database Delete Functionailty works correctly', () => {

    it("Delete 'UnitTest1' coursework and milestones", () => {
        db_course.FindCourseWorks("UnitTest1").then((course) => {
            mileDb.DeleteAllMilestonesForCoursework(course[0]._id).then((mile) => {

                mileDb.FindMileStoneForCoursework(course[0]._id).then((deleteMile) =>
                {
                    assert(deleteMile.length, 0);
                    db_course.DeleteCourseWork(course[0]._id).then((course2) => {

                        db_course.FindCourseWork(course[0]._id).then((deleteCourse) =>
                    {
                        assert(deleteCourse.length, 0);
                    })})

                });

            });


        });
    });

    it("Delete 'UnitTest2' coursework and milestones", () => {
        db_course.FindCourseWorks("UnitTest2").then((course) => {
            mileDb.DeleteAllMilestonesForCoursework(course[0]._id).then((mile) => {

                mileDb.FindMileStoneForCoursework(course[0]._id).then((deleteMile) =>
                {
                    assert(deleteMile.length, 0);
                    db_course.DeleteCourseWork(course[0]._id).then((course2) => {

                        db_course.FindCourseWork(course[0]._id).then((deleteCourse) =>
                        {
                            assert(deleteCourse.length, 0);
                        })})

                });

            });


        });
    });


});

