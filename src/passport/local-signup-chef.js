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
      .then(function() {
        return done(null);
      })
      .catch(function(err) {
        return done(err);
      });
  }
);
