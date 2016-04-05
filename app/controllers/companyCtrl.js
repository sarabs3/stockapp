var company = require('../models/company');
var Person = require('../models/person');
var Story = require('../models/story');
var shares = require('../models/shares');

module.exports.addCompany = addCompany;
module.exports.companyList = companyList;
module.exports.removeCompany = removeCompany;
module.exports.findCompany = findCompany;
module.exports.updateCompany = updateCompany;

// get all
function companyList(callback){
	company.find({}, function(err, companies) {
	  if (err){
	  	callback(err);
	  }
	  else{
	  	callback(null,companies);	
	  }
	});
	/*company.find({}, function(err, companies) {
	  if (err){
	  	callback(err);
	  }
	  else{
	  	var companyDetail ={};
	  	companies.forEach(function(err,count){
	  		shares.findOne({'companyId':companies[count]._id},function(err,shares){
	  			if(shares!==null){
	  				companyDetail.companyId = shares.companyId;
	  				companyDetail.companyName = companies[count].name;
	  				companyDetail.description = companies[count].description;
	  				companyDetail.shareprice = shares.shareprice; 
	  				companyDetail.date = shares.date;
	  			}
	  			console.log(companyDetail);
	  		});

	  	});
	  	 	
	  }
	});*/
	
};
// add 
function addCompany(name, description, callback){
	var newCompany = new company();
	  newCompany.name = name;
	  newCompany.description = description;
		newCompany.save(function(err) {
		  if (err){
		  	callback(err);
		  }
		  else{
		  	callback(null, newCompany);
		  }
	});
};
//delete 
function removeCompany(id,callback){
	var companyId = id;
	company.remove({ _id: companyId },function(err) {
		if (err) throw err;
		callback(null);
		console.log("company deleted successfully");
	});
};
//find
function findCompany(id, callback){
	var companyId = id;
	company.findOne({_id: companyId},function(err, companyFound){
		if (err){
	  	callback(err);
	  }
	  else{
	  	callback(null, companyFound);
	  }
	});
};
//update
function updateCompany(id, name, description, callback){

	company.find({_id: id},function(err, company){
		if (err){
	  	callback(err);
	  }
	  else{
	  	  company[0].name = name;
		  company[0].description = description;
		  company[0].save(function(err) {
		  if (err){
		  	callback(err);
		  }
		  else{
		  	callback(null, company);
		  }
		});
	  }
	});
};