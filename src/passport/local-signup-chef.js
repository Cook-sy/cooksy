var jwt = require('jsonwebtoken');
var db = require('../models');
var Strategy = require('passport-local').Strategy;

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    db.Chef
      .create({
        username: username.trim(),
        password: password.trim(),
        image: req.body.image.trim(),
        address: req.body.address.trim(),
        city: req.body.city.trim(),
        state: req.body.state.trim(),
        zipcode: req.body.zipcode.trim()
      })
      .then(function(chef) {
        var payload = {
          sub: chef.id,
          chef: chef.username,
          role: 'chef',
          zipcode: chef.zipcode
        };

        var token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '7d'
        });

        return done(null, token);
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
