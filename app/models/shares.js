
// grab the mongoose module
var db = require('../../config/db');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var shareSchema = new db.Schema({
	companyId : String,
	_company : { type: String, ref: 'company' },
	shareprice : Number,
	date:Date
});

var share = db.mongoose.model('share', shareSchema);
// Exports
module.exports = share;