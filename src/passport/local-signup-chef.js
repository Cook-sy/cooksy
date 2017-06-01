var jwt = require('jsonwebtoken');
var Strategy = require('passport-local').Strategy;
var chefCtrl = require('../controllers/chef-ctrl');

module.exports = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  function(req, username, password, done) {
    return chefCtrl.createChef(req.body, username, password)
      .then(function(chef) {
        var payload = {
          sub: chef.id,
          user: chef.username,
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
