var LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcryptjs');




 function initialize(passport)
{
    console.log('we here');


    let DAO = require('../model/User');

        let db =   new DAO('User.db');

    passport.use(new LocalStrategy(
         function(username, password, done) {
             let db2 =   new DAO('User.db');
    let user = db2.findUser(username).then((foundUser) =>
    {
        try
        {

            bcrypt.compare(password, foundUser[0].Password, function(err, result) {
                if(result == true)
                {
                    console.log("YAYA")
                    return done(null, foundUser[0]._id);
                }
                else
                {

                    return done(null, false, 'Incorrect Password');
                }
            });


        }
        catch(e)
        {
            return done(null, false, 'Bad Credentials');
        }
    });



        }));

    passport.serializeUser((userId,done) => done(null, userId));

    passport.deserializeUser((userId, done) => {
        db.findUser(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err))
    });



}


module.exports = initialize;