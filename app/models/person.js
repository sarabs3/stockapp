var db = require('../../config/db');

var personSchema = new db.Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: db.Schema.Types.ObjectId, ref: 'Story' }]
});
var Person = db.mongoose.model('Person', personSchema);
module.exports = Person;