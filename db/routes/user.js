const express = require("express");
const router = express.Router();

const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
require("../auth/passport");

const bodyParser = require("body-parser");
router.use(bodyParser.json());


router.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});


router.post("/register", async (req, res, next) => {
  await User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        console.log(user);
        res.setHeader("Content-Type", "Application/JSON");
        res.status(400).json({
          message: "The following username is already registered",
          username: req.body.username,
        });
      }
      var hash = bcrypt.hashSync(req.body.password, salt);
      console.log(hash);
      new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        // paymentAccount:req.body.paymentAccount,
        imageHash:req.body.imageHash
      })
        .save()
        .then((user) => {
          const token=jwt.sign(
            { username: user.username, password: user.password, _id: user._id },
            "your_jwt_secret"
          );
          res.setHeader("Content-Type", "Application/JSON");
          res.json({ user: user,token:token, message: "Successfully registered" });
          console.log(user);
        })
        .catch((err) => {
          res.status(400).json({ message: "Unexpected server error" });
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});



/* POST login. */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err || !user);
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res);
});


//get user details route
// router.get("/users/:username",passport.authenticate('jwt',{session:false}),async(req,res,next)=>{
// await User.findOne({username:req.params.username}).populate('purchasedPosts.post')
// .then((user)=>{
//   console.log(user)
//  return res.json({user:user})
// })
// .catch((err)=>{
//   console.log(err)
// })
// })

module.exports = router;
