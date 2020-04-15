let bcrypt = require('bcryptjs');
const Datastore = require('nedb');

let db = new Datastore({
    filename: 'UserDb.db',
    autoload: true
});


class UserDAO
{
    constructor(path)
    {
        if(path){
            this.db = new Datastore({ filename: path, autoload: true });
            console.log("Db Connected: ", path);
        }
        else
        {
            this.db = new Datastore();
        }
    }

    init()
    {
      this.db.insert({_id: 'Gavin', Password: 'Test'});
        this.db.insert({_id: 'Ben', Password: 'Test2'});
    }

    InsertUser(username, password)
    {
        this.db.insert({_id: username, Password: password});
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

    findUser(username)
    {
        console.log("QUERY: " + username);
        return new Promise((resolve, reject) => {
            this.db.find({_id : username}, function (err, entries) {
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


module.exports = UserDAO;

