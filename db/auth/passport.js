const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const User=require("../models/User")
const bcrypt=require("bcryptjs")

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;


//all the auth logic is present in this file most of it is directly available code on internet 


passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },

    async(username, password, cb)=>{

      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      await User.findOne({username})
        .then((user) => {
          if (!user) {
            console.log('username doesnt exist')
            return cb(null, false, { message: "The username doesn't exist." });
          }

          if (!bcrypt.compareSync(password, user.password)) {
              console.log('Incorrect password')
            return cb(null, false, {
              message: "Incorrect password.",
            });
          }
          console.log("Successful login")
          console.log(user)
          return cb(null, user.toJSON(), { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);


passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
      secretOrKey: "your_jwt_secret",
    },
    async (jwtPayload, cb) => {
      console.log(jwtPayload._id);
      //find the user in db if needed
      await User.find({ _id: jwtPayload._id })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);