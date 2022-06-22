const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const saltRound = 15;
userSchema.pre("save", function(next){
  bcrypt.hash(this.password, saltRound, (err, hashed) => {
    if(err) {
      console.log("An error occurred");
    } else {
      this.password = hashed;
      next();
    }
  });
});

userSchema.methods.validatePassword = function(password, callback){
  bcrypt.compare(password, this.password, (err, result) => {
    if(!err) {
      callback(err, result);
    } else {
      next()
    }
  });
}

const UserModel = mongoose.model("users_tbs", userSchema);


module.exports = UserModel;