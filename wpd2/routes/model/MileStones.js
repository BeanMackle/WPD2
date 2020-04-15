const Datastore = require('nedb');

let db = new Datastore({
    filename: 'Milestone.db',
    autoload: true
});


class MileDAO
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

    insert(name, id)
    {
        this.db.insert({Name: name, courseworkId : id});
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

    FindMileStoneForCoursework(id)
    {
        return new Promise((resolve,reject) =>
        {
            this.db.find({courseworkId : id}, function (err, entries) {
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

    UpdateMilestone(id, name)
    {
        return new promise((resolve,reject) =>
        {
            this.db.update({_id : id}, {$set: {Name : name}}, function (err, num) {

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
        return new promise((resolve,reject) =>
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


module.exports = MileDAO;
