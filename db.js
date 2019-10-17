require('dotenv').config()

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = `mongodb://${process.env.Mongo_HOST}:${process.env.Mongo_PORT}/jast`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
})