const UserModel = require("../models/users.model")

const register = (req, res) => {
  const email = req.body.email;
  UserModel.findOne({email}, (err, result) => {
    if (err) {
      res.status(501).send({message: "Internal Server Error", status: false});
    } else {
      if(result) {
        res.send({message: "Email already exist", status: false});
      } else {
        const form = new UserModel(req.body);
        form.save((err) => {
          if(err) {
            res.status(501).send({message: "Internal server error", status: false});
          } else {
            res.send({message: "Successful", status: true});
          }
        });
      }
    }
  });
}

const login = (req, res) => {
  UserModel.findOne({email: req.body.email}, (err, result) => {
    if(err) {
      res.status(501).send({message: "Internal server error", status: false});
    } else {
      if(!result) {
        res.send({message: "Email does not exist", status: false})
      } else {
        result.validatePassword = (password, (error, response) => {
          if (error) {
            res.send({message: "Error validating password", status: false});
          } else {
            if(result) {
              res.send({message: "successful", status: true});
            }
          }
        })
      }
    }
  })
}

module.exports = { register, login}