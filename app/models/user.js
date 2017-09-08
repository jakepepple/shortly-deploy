var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true}
});


var User = mongoose.model('User', userSchema);
User.prototype.comparePassword = function(attemptedPassword, cb) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, isMatch);
    }
  });
},
  userSchema.pre('save', function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
        next();
      });
  });

module.exports = User;
