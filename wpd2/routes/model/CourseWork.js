

let bcrypt = require('bcryptjs');
const Datastore = require('nedb');

let db = new Datastore({
    filename: 'CourseworkDb.db',
    autoload: true
});


class CourseWorkDAO
{
    constructor(dbFilePath)
    {
        if(dbFilePath){
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
            console.log("Db Connected: ", dbFilePath);
        }
        else
        {
            this.db = new Datastore();
        }
    }

    insert(title,module, author, dueDate, completionDate)
    {
        this.db.insert({Title: title,Module : module, Author : author, DueDate: dueDate, CompletionDate: completionDate, Share: false  });
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
        return new Promise((resolve,reject) => {
            this.db.find({Author : user}, function (err, entries) {
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
        return new Promise((resolve,reject) => {
            this.db.find({_id : id}, function (err, entries) {
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

    UpdateCourseWork(id, title, module, author, dueDate, completionDate, share)
    {

        return new Promise((resolve,reject) =>
        {
            this.db.update({_id : id}, {$set: {Title: title,Module : module, Author : author, DueDate: dueDate, CompletionDate: completionDate, Share : share}}, function (err, num) {

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
            this.db.remove({_id : id}, function (err, num) {
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


}


module.exports = CourseWorkDAO;





