var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req)
  res.cookies('access_token', {maxAge: Date.now()});
  // res.cookie('cookieName','1243', { maxAge: 900000, httpOnly: true });
  res.send('respond with a resource');
});
module.exports = router;
