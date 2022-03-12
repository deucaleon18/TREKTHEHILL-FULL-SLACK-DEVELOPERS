const express=require("express")
const app=express()
require('dotenv').config()

var cors = require("cors");
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const mongoose=require("mongoose")
const PORT=process.env.PORT || 5000
const authRoute=require("./routes/user")
// const postRoute=require("./routes/posts")

const homeRoute=express.Router()
require("./auth/passport");


const passport=require("passport")

homeRoute.get('/',(req,res,next)=>{
 res.json({message:"This is the home page"})
})

//MongoDB connection
const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.PASSWORD}@cluster0.nz2fc.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

try{
mongoose.connect(
    uri, { useNewUrlParser: true, useUnifiedTopology: true})
   .then ((res) => console.log("Mongoose is connected"))
}
catch {(err) => {
    console.log(err);
    console.log("Coudn't connect to MongoDB");
   }}
app.use(passport.initialize());
app.use("/",authRoute)

app.use("/home",
// passport.authenticate('jwt',{session:false}),
homeRoute)

// app.use("/posts",passport.authenticate('jwt',{session:false}),postRoute)
//Starting the server 
app.listen(PORT,()=>{
    console.log(`Successfully connected to PORT ${PORT}`)
})