let bcrypt = require('bcryptjs');
const Datastore = require('nedb');


let db = new Datastore({ filename: "DB/User", autoload: true });

class UserDAO
{
    constructor(path)
    {
        if(path){

        console.log("Db Connected: ", path);
    }
    else
        {
            this.db = new Datastore();
        }
    }



    InsertUser(username, password)
    {


        return new Promise((resolve, reject) => {

            let salt = 5;

            bcrypt.hash(password, salt, function(err, newPass) {


                let db = new Datastore({
                    filename: "DB/User",
                    autoload: true
                });

                db.insert({_id: username, Password: newPass}, function (err, entries) {


                    if (err) {
                        reject(err);
                        console.log(err);
                    } else {
                        resolve(entries);
                        console.log('resolved');
                    }
                });

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

        return new Promise((resolve, reject) => {

            let db = new Datastore({
                filename: "DB/User",
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

