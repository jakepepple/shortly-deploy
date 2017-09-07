var app = require('./server-config.js');
require('dotenv').config();

var port = 80;

app.listen(port);

//app.listen(port);

console.log('Server now listening on port ' + port);
console.log('still works');
