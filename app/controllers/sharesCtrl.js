var shares = require('../models/shares');

module.exports.addShares = addShares;
module.exports.findShareprice = findShareprice;

function addShares(id , share , date , callback) {
	var companyShare = new shares();
	companyShare.companyId = id;
	companyShare._company = id;
	companyShare.shareprice = share;
	companyShare.date = date;
	companyShare.save(function(err){
		if(err){
			callback(err);
		}
		else{
			callback(null,companyShare);


			shares
			.findOne({companyId:id})
			.populate('_company')
			.exec(function(err,data){
				data.save(function(err){
					if(err){
						console.log(err)
					}
					else{
						console.log(data._company.name);
					}
				});
			});	
			
		}
	});
}
function findShareprice(id,callback){
	shares.find({companyId:id},function(err,data){
		if(err){
			console.log(err);	
		} 
		else{
			callback(null, data);
			console.log(data);
		}
		
	});
}