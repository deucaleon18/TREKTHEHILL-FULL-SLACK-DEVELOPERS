const mongoose=require("mongoose")

//User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 imageHash:{
   type:String,
   required:false
 },

 admin:{
   type:Boolean,
   default:false
 }
//  purchasedPosts:[{post:{type:mongoose.Schema.Types.ObjectId,ref: 'Post'}}]
});


module.exports=mongoose.model("User",userSchema)



// {"username":"shubham","password":"shantamveena","email":"shubham@gmail.com","imageHash":
// "fdfnidfnh","paymentAccount":"dfidjfijdfjdifj"}



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJ1c2VybmFtZSI6InNodWJoYW0iLCJwYXNzd29yZCI6IiQyYSQxMCRNeVB6SVM5UmJOaDRDYUs1WUlsOTQuTS81UjZVVWlTSkk4Z2FNNjRpeGMvSmhBekJLaUk3eSIsIl9pZCI6IjYxOWFjZDI4ZDI5Njc5NTgzNjJiODFjYSIsImlhdCI6MTYzNzUzNTAxNn0
//   .OPQ8aG2aPMJXqZ__5WnAZaYh3IFIxG0JX2NNMs0lAHY;