const Datastore = require('nedb');

let db = new Datastore({
    filename: 'Milestone',
    autoload: true
});


class MileDAO
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

    insert(name, id, finished)
    {  db = new Datastore({
        filename: 'Milestone',
        autoload: true
    });

        db.insert({Name: name, courseworkId : id, Finished : finished});
        console.log('WE WORKED LADS');
    }

    all()
    {
        return new Promise((resolve, reject) => {

            db = new Datastore({
                filename: 'Milestone',
                autoload: true
            });

            db.find({}, function (err, entries) {
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
    FindMileStone(id)
    {
        return new Promise((resolve,reject) =>
        {
            db = new Datastore({
                filename: 'Milestone',
                autoload: true
            });


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
        })
    }

    FindMileStoneForCoursework(id)
    {
        return new Promise((resolve,reject) =>
        {
            db = new Datastore({
                filename: 'Milestone',
                autoload: true
            });


            db.find({courseworkId : id}, function (err, entries) {
                if(err)
                {
                    reject(err);
                }
                else
                    {
                        resolve(entries);
                    }

            })
        })
    }

    UpdateMilestone(id, name, finished)
    {
        return new Promise((resolve,reject) =>
        {



            db.update({_id : id}, {$set: {Name : name, Finished : finished}}, function (err, num) {

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

    DeleteMileStone(id)
    {
        return new Promise((resolve,reject) =>
        {
            db = new Datastore({
                filename: 'Milestone',
                autoload: true
            });

            db.remove({_id : id}, function (err, num) {
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

    DeleteAllMilestonesForCoursework(id)
    {
        return new Promise((resolve,reject) =>
        {
            db = new Datastore({
                filename: 'Milestone',
                autoload: true
            });

          db.remove({courseworkId : id}, function (err, num) {
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


module.exports = MileDAO;
