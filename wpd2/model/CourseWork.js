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

    init(title, author)
    {
        this.db.insert({Title: title, Author : author });
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

}


module.exports = CourseWorkDAO;





