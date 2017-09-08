
var mongoose = require('mongoose');

mongoUri = 'mongodb://localhost/shortlydb';
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('sucess');
});
     
    
 
module.exports = db;
