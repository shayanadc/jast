const passport = require('passport');

var GitHubStrategy = require('passport-github2').Strategy;
var Q = require('../userQuery')
var md5 = require('md5');


passport.use(new GitHubStrategy({
    clientID: 'bf7641912a592abf5fd7',
    clientSecret: 'db0c54f52575634cb381a6e001af449a0b87d2f3',
    scope: ['user:email'],
    callbackURL: "http://127.0.0.1:3000/auth/github/callback",
  },
  async function(accessToken, refreshToken, profile, done) {
    // console.log(profile.emails[0].value)
    user = await Q.findAndUpdateUser({access_token: accessToken, prefix: profile.username })
    return done(null, user);
  }
));