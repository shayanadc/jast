const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://127.0.0.1/jast';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
})