let bcrypt = require('bcryptjs');
const Datastore = require('nedb');

let db = new Datastore({
    filename: '../User.db',
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
        return new Promise((resolve, reject) => {

            let salt = 5;

            bcrypt.hash(password, salt, function(err, newPass) {

                if(err)
                {
                    reject(err);
                }
                else
                    {
                        const store = require('nedb');

                        let db = new store({
                            filename: '../User.db',
                            autoload: true
                        });
                        console.log("DO THE INSERT");

                        try {



                            db.insert({_id: username, Password: newPass}, function (err2, success) {

                                if (err2) {
                                    reject(err2);
                                } else {
                                    resolve(success);
                                }

                            });
                        }
                        catch(e)
                        {
                            console.log('TITS');
                            console.log(e);
                        }
                    }

                });

            });




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
            let db = new Datastore({
                filename: '../User.db',
                autoload: true
            });
            db.find({_id : username}, function (err, entries) {
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

