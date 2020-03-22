const Datastore = require('nedb');

let db = new Datastore({
    filename: 'db.db',
    autoload: true
});


class DAO
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

   init()
    {
        this.db.insert({UserName: 'asdfasdfasdf', Password: 'asdfasdfasdf'});
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


module.exports = DAO;

