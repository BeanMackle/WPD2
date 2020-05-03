

let bcrypt = require('bcryptjs');
const Datastore = require('nedb');

let db  = new Datastore({ filename: "Coursework", autoload: true });


class CourseWorkDAO
{
    constructor(dbFilePath)
    {
        if(dbFilePath){

            console.log("Db Connected: ", dbFilePath);
        }
        else
        {
            this.db = new Datastore();
        }
    }

    insert(title,module, author, dueDate, completionDate)
    {


      db.insert({Title: title,Module : module, Author : author, DueDate: dueDate, CompletionDate: completionDate, Share: false  });
        console.log('WE WORKED LADS');
    }

    all()
    {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, entries) {
                if (err) {
                    reject(err);
                    console.log('rejected');
                } else {
                    resolve(entries);
                    console.log('resolved');
                }
            });
        })


    }


    FindCourseWorks(user)
    {
        db = new Datastore({
            filename: 'Coursework',
            autoload: true
        });

        return new Promise((resolve,reject) => {


            db.find({Author : user}, function (err, entries) {
                if(err)
                {
                    reject(err);
                }
                else
                    {
                        resolve(entries);
                    }

            })
        });
    }

    FindCourseWork(id)
    {
        db = new Datastore({
            filename: 'Coursework',
            autoload: true
        });

        return new Promise((resolve,reject) => {
            db.find({_id : id}, function (err, entries) {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(entries);
                }

            })
        });
    }

    UpdateCourseWork(id, title, module, author, dueDate, completionDate)
    {

        return new Promise((resolve,reject) =>


        {
            db = new Datastore({
                filename: 'Coursework',
                autoload: true
            });
            db.update({_id : id}, {$set: {Title: title,Module : module, Author : author, DueDate: dueDate, CompletionDate: completionDate}}, function (err, num) {

                if(err)
                {
                    reject(err);
                }
                else
                    {
                        resolve(num);
                    }

            })
        })

    }

    UpdateShareCoursework(id, share)
    {

        return new Promise((resolve,reject) =>
        {
            db = new Datastore({
                filename: 'Coursework',
                autoload: true
            });
            db.update({_id : id}, {$set: { Share : share}}, function (err, num) {

                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(num);
                }

            })
        })

    }


    DeleteCourseWork(id)
    {
        return new Promise((resolve,reject) =>
        {

            db.remove({_id : id}, function (err, num) {
                if(err)
                {
                    reject(err);
                }
                else
                    {
                        console.log(num);
                        resolve(num);
                    }

            })
        })
    }


}


module.exports = CourseWorkDAO;





