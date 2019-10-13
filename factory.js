const factory = require('factory-girl').factory;
const User    = require('./users').UserSchema;
const Stub    = require('./users').StubSchema;
const mongoose = require('mongoose');


factory.define('User', User, {
    prefix: 'shayanadc',
    access_token : "509649a42c295db01ab626d638b85578db80ga1g12"
});
factory.define('Stub', Stub, {
    _id :  mongoose.Types.ObjectId(),
    request : {meta: 'hi'},
    response  : {message : 'ok'},
    header : {},
    status : 200,
    method : 'POST',
    endpoint : 'books',
    user: factory.assoc('User', '_id')
});

module.exports = factory;