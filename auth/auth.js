const passport = require('passport');
require('dotenv').config()

var GitHubStrategy = require('passport-github2').Strategy;
var Q = require('../userQuery')

var sha1 = require('sha1');

passport.use(new GitHubStrategy({
    clientID: process.env.Github_Client_ID,
    clientSecret: process.env.Github_Client_SECRET,
    scope: ['user:email'],
    callbackURL: process.env.Github_CALLBACK,
  },
  async function(accessToken, refreshToken, profile, done) {
    user = await Q.findAndUpdateUser({ access_token: accessToken, prefix: sha1(profile.username) })
    return done(null, user);
  }
));