var companyCtrl = require('./controllers/companyCtrl');
var expertCtrl = require('./controllers/expertCtrl');
var sharesCtrl = require('./controllers/sharesCtrl');
/*var predictionCtrl = require('../server/controller/predictionCtrl');
var userCtrl = require('../server/controller/userCtrl');*/

module.exports = function(app){
	/*==================================
		all routes for company
	====================================*/

	//find all companies
	app.post('/api/companies',function(req, res) {
	    companyCtrl.companyList(function(err, companies){
	      res.json(companies);
	    });
  	});

  	//add company
	app.post('/api/company/add',function(req,res){
		var name = req.body.name;
		var description = req.body.description;
		companyCtrl.addCompany(name, description, function(err,response){
			console.log(response);
		});
	});

	//find one company
	app.post('/api/company/find/:id', function(req,res){
	    var companyId = req.params.id;
	    console.log(companyId);
	    companyCtrl.findCompany(companyId,function(err,data){
	      res.json(data);
	    });
  	});

  	//update company
  	app.post('/api/company/update/:id', function(req,res){
	    var companyId = req.params.id;
	    var name = req.body.name;
	    var description = req.body.description;
	    var sharePrice = req.body.shareprice;
	    companyCtrl.updateCompany(companyId, name, description, sharePrice, function(err){
	      console.log("company updated");
	    });
  	});

  	//delete company 
  	app.post('/api/company/delete/:id', function(req,res){
	    var companyId = req.params.id;
	    companyCtrl.removeCompany(companyId,function(err, data){
	      console.log("company deleted");
	    });
  	});

  	//add share price
  	app.post('/api/company/addShare/:id',function(req,res){
  		var id = req.params.id;
  		var shareprice =  req.body.shareprice;
  		var date = new Date().toISOString().
  			replace(/T/, ' ').      // replace T with a space
  			replace(/\..+/, '');
  		sharesCtrl.addShares(id,shareprice , date,function(err,data){
  			//console.log(data);
  		});
  	});
  	app.post('/api/company/sharepricelist/:id',function(req,res){
  		var companyId = req.params.id;
  		sharesCtrl.findShareprice(companyId,function(err,data){
  			res.json(data);
  		});
  	});
  	/*==================================
		all routes for expert
	====================================*/
	app.post('/api/experts',function(req, res) {
	    expertCtrl.expertList(function(err, experts){
	      res.json(experts);
	    });
  	});
  	app.post('/api/expert/add',function(req, res) {
	    var name = req.body.name;
		var description = req.body.description;
		expertCtrl.addExpert(name, description, function(err, data){
		  	console.log(name + description);
		});
  	});
  	app.post('/api/expert/find/:id',function(req, res) {
	    var expertId = req.params.id;

	  	expertCtrl.findExpert(expertId,function(err,data){
	  		res.json(data);
	  		console.log(data);
	  	});
  	});
  	app.post('/api/expert/update/:id', function(req,res){
	    var expertId = req.params.id;
	  	var name = req.body.name;
	  	var description = req.body.description;
	  	expertCtrl.updateExpert(expertId, name, description, function(err){
		    console.log(name);
	  	});
  	});
  	app.post('/api/expert/delete/:id',function(req, res) {
  		var expertId = req.params.id;
	  	expertCtrl.removeExpert(expertId,function(err, data){
	  		console.log("Expert deleted");
	    });

  	});

	// frontend routes =========================================================
        // route to handle all angular requests
  
	app.get('*', function(req, res) {
        res.sendFile('/public/index.html', { root: __dirname }); // load our public/index.html file
    });
}
/*//routing for Experts
exports.addexpert = function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  expertCtrl.addExpert(name, description, function(err, data){
      res.redirect('/experts');
  });
  };
exports.experts = function(req, res) {
  expertCtrl.expertList(function(err, experts){
    res.render('experts',{experts:experts});
});
};
exports.deleteExpert = function(req,res){
  var expertId = req.params.id;
  expertCtrl.removeExpert(expertId,function(err, data){
      res.redirect('/experts');
    }); 
};
exports.findExpert=function(req,res){
  var expertId = req.params.id;
  expertCtrl.findExpert(expertId,function(err,data){
    res.render('updateExpert',{expert:data});
  });
  
};
exports.updateExpert= function(req,res){
  var expertId = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  expertCtrl.updateExpert(expertId, name, description, function(err){
    console.log(name);
    res.redirect('/experts');
  });
};

//routing for company
exports.addCompany = function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var sharePrice = req.body.shareprice;
  companyCtrl.addCompany(name, description,sharePrice, function(err, data){
      res.redirect('/companies');
  });
};
exports.companies = function(req, res) {
    companyCtrl.companyList(function(err, companies){
      res.render('companies',{companies:companies});
    });
};
exports.deleteCompany = function(req,res){
  var companyId = req.params.id;
  companyCtrl.removeCompany(companyId,function(err, data){
      res.redirect('/companies');
    }); 
};
exports.findCompany=function(req,res){
  var companyId = req.params.id;
  companyCtrl.findCompany(companyId,function(err,data){
    res.render('updateCompany',{company:data});
  });
  
};
exports.updateCompany = function(req,res){
  var companyId = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  var sharePrice = req.body.shareprice;
  companyCtrl.updateCompany(companyId, name, description, sharePrice, function(err){
    console.log("trigger this");
    res.redirect('/companies');
  });
};

//Share Price
exports.addSharePrice = function(req, res) {
    var name = req.body.cid;
    var price = req.body.currentprice;
    var date = new Date();
    SharePriceCtrl.addSharePrice(name,price,date,function(err, data){
      res.redirect('/share-price');
    });
};
exports.sharePrice = function(req,res){
  SharePriceCtrl.getSharePrice(function(err, data){
    res.render('add-share-price',{sharePrice:data})
  });
 }

//predictions
exports.predictions = function(req, res) {
  predictionCtrl.viewPredictions(function(err, company, expert){
    res.render('add-predictions',{companies:company, experts: expert});
    console.log(company);
  });
  
};
exports.addPrediction = function(req, res) {
  var company = req.body.companyid;
  var expert = req.body.expertid;
  var date = req.body.date;
  var hrs = req.body.hrs;
  var sec = req.body.sec;
  var gmt = req.body.gmt;
  var time = hrs + ":" + sec + ":" + gmt;
  var runningprice = req.body.runningprice;
  var targetprice = req.body.targetprice;
  var predictedprice = req.body.predictedprice;
  var suggestion = req.body.suggestion;
  predictionCtrl.addPrediction(company,expert,runningprice,predictedprice,targetprice,suggestion,date,time,function(err, data){
      res.redirect('/predictions');
    });
};
*/