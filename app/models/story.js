var db = require('../../config/db');

var storySchema = new db.Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = db.mongoose.model('Story', storySchema);
module.exports = Story;