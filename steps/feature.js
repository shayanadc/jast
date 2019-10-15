
const { Given, When, Then, Before} = require('cucumber');
var chai = require('chai')
  , chaiHttp = require('chai-http')
  , chaiJsonEqual = require('chai-json-equal');
var expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJsonEqual);
const app = require("../app")
var Factory = require('../factory')
var mongoose = require('mongoose')
var Q = require('../userQuery')

Before(async function(){
  await mongoose.connection.db.dropDatabase();
})

this.mockObjId;
Given('I am a user with prefix {string} and access_token {string}', async function (string, string2) {
  console.log(2)
    this.prefix = string
    this.access_token = string2
    this.user = await Factory.create('User', { prefix : this.prefix, access_token : this.access_token})
});

Given('I mock object id with {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  this.mockObjId = mongoose.Types.ObjectId(string)
});


Given('I create stub:', async function (docString) {
  console.log(3)
  this.userAcc = JSON.parse(docString);
  this.userAcc._id = this.mockObjId
  this.stub = await Factory.create('Stub',this.userAcc)
  this.user.stubs.push(this.stub._id)
  this.user.save()
});
When('open form {string}', function (string) {
  console.log(4)
  this.endpoint = string
});
When('authenticate with {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  this.authUserToken = string
});
// let chaiResponse;
When('I submit with method {string}:', async function (string, docString) {
  console.log(5)
  if(string == 'DELETE'){
    this.chaiResponse = await chai.request(app).delete(this.endpoint).set('access_token', this.authUserToken)
    }
  else if(string == 'GET') {
    this.chaiResponse = await chai
    .request(app).get(this.endpoint).set('access_token', this.authUserToken)
  }else if (string == 'POST'){
    this.jsonRequest = JSON.parse(docString);
    this.chaiResponse = await chai.request(app)
    .post(this.endpoint).set('access_token', this.authUserToken)
    .send(this.jsonRequest)
    console.log(6)
  }
});

Then('I recieved ok', function () {
  console.log(7)
  expect(this.chaiResponse.status).to.deep.equal(200)
});

Then('I recieved json:', function (docString) {
  console.log(8)
  this.obj = JSON.parse(docString);
  expect(this.chaiResponse.body).to.deep.equal(this.obj)
});

Then('I recieved not ok', function () {
  console.log(9)
  expect(this.chaiResponse.status).to.deep.equal(400)
});

Then('I could not find stub with id {string}', async function (string) {
  stub = await Q.findStub({_id : string})
  expect(stub).to.deep.equal(null)

});