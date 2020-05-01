var LocalStrategy = require('passport-local').Strategy;




 function initialize(passport)
{
    console.log('we here');


    let DAO = require('../model/User');

        let db =   new DAO('User');

    passport.use(new LocalStrategy(
         function(username, password, done) {
             let db2 =   new DAO('User');
    let user = db2.findUser(username).then((foundUser) =>
    {
        console.log(JSON.stringify(foundUser));
       console.log(foundUser[0].Password);

        try
        {


            if(password === foundUser[0].Password)
            {
                console.log("YAYA")
                return done(null, foundUser[0]._id);
            }
            else
            {

                return done(null, false, 'Incorrect Password');
            }
        }
        catch(e)
        {
            return done(e);
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