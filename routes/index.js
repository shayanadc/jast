var express = require('express');
var router = express.Router();
require('../db')
const Query = require('../userQuery')
const passport = require('passport')
const { check, validationResult } = require('express-validator');

router.get('/',function(req, res) {res.render('index')})
router.get('/api_mock',function(req, res) {res.render('api_mock')})


async function ensureAuthenticated(req, res, next) {
 var Htoken = req.headers.access_token
 user  = await Query.findUserWithStubs({access_token: Htoken})
 if(!user) res.status(401).json({err: "UnAuthorized"})
 if(user) {
   req.user = user
   next()
 }
}
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {session: false}), function(req, res) {
    data = { prefix : req.user.prefix, access_token : req.user.access_token }
    expiredTime = new Date(Date.now() + 7 * 24*60*60*1000)
    res.cookie('prefix', data.prefix, { expire : expiredTime, httpOnly: false });
    res.cookie('access_token', data.access_token, { expire : expiredTime, httpOnly: false });
    res.redirect('/')
  })

router.delete('/stubs/:id', ensureAuthenticated, async function(req, res, next) {
  await Query.deleteStub({_id : req.params.id})
  res.send({message: "deleted"})
})

router.post('/stubs', [ ensureAuthenticated,
  check('status').not().isEmpty().withMessage('status field is required'),
  check('status').isInt({ min: 200, max: 499 }).withMessage('method field is required'),
  check('response').not().isEmpty().withMessage('response field is required'),
  check('endpoint').not().isEmpty().withMessage('endpoint field is required'),
  check('method').not().isEmpty().withMessage('method field is required'),
  check('method').isIn(['POST', 'GET', 'PUT', 'DELETE']).withMessage('method field should one of [POST, GET, PUT, DELETE]')
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let cs = errors.array().map(function(num) {
      return num.msg
    });
    return res.status(400).json({ errors: cs});
  }

  try{
    var user = await Query.findUserWithStubs({ prefix: req.user.prefix})
    endpoint_arr = req.body.endpoint.split("")
    if(endpoint_arr[0] == '/'){
      req.body.endpoint = req.body.endpoint.slice(1,)
    }
    await Query.saveUserStub(user, req.body)
    var user = await Query.findUserWithStubs({ prefix: req.user.prefix}, "-_id -__v -user")
    var myJSON = JSON.parse(JSON.stringify(user.stubs))
    res.send({message : 'new one saved!!', prefix : user.prefix, items : myJSON})
  } catch (err){
    const keys = Object.entries(err.errors)
    err = []
    keys.forEach(element => {
      element.forEach(item => {
      if(item['message']) err.push(item['message'])
    });
  });
    res.status(400).send({errors : err})
  }
})

router.get('/stubs', ensureAuthenticated, async function(req, res, next) {
  user = await Query.findUserWithStubs({access_token: req.user.access_token})
  var myJSON = JSON.parse(JSON.stringify(user.stubs));

  if(user){
    res.status(200).send(myJSON)
  }else{
    res.status(400).send('Not Found')  
  }
})

router.all('/:prefix/*', async function(req, res, next) {
  if(req.params[0] == 'jast_mock_api' && req.method == 'GET'){
    res.status(200).send({"message" : "test is ok"})  
  }else{
    if(req.method == 'GET'){
      var user = await Query.findUserWithStubsWhere
    (
      { prefix: req.params.prefix }, 
      {method: req.method, endpoint : req.params[0]}
    )
    }else{
      var user = await Query.findUserWithStubsWhere
      (
        { prefix: req.params.prefix }, 
        {request : req.body, method: req.method, endpoint : req.params[0]}
      )
    }
    if(user && user.stubs.length != 0){
      res.status(user.stubs[0].status).send(user.stubs[0].response)  
    }else{
        res.status(400).send('Not Found')    
    }
  }
})


module.exports = router;
