const express= require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true});
const userSchema = {
  FirstName: String,
  LastName: String,
  email: String,
  password: String,
  MobileNumber: Number
};
const User = new mongoose.model("User", userSchema);

app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){

  res.render("login");
});

app.get("/register", function(req,res){
  res.render("register");
});
app.get("/logout", function(req, res){
  res.redirect("/");
});
app.post("/register", function(req,res){
  const newUser = new User({
    FirstName: req.body.fname,
    LastName: req.body.lname,
    email: req.body.username,
    password: req.body.password,
    MobileNumber: req.body.mobilenumber
  });
  newUser.save(function(err){
    if (err){
      console.log(err);
    }
    else{
      res.render("Success");
    }
  });
});
app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    }
    else{
      if (foundUser){
        if(foundUser.password === password){
          res.render("Secrets");
        }
      }
    }
  });
});
app.listen(3000, function(){
  console.log("server is running @ port 3000");
});
