angular.module('CompanyCtrl',['datatables','datatables.bootstrap'],function($locationProvider){
	$locationProvider.html5Mode(true);
}).controller('CompanyController',['$scope','$http', '$location', '$window', 'DTOptionsBuilder', 'DTColumnDefBuilder' , function($scope, $http, $location , $window , DTOptionsBuilder , DTColumnDefBuilder ){
	
	//init datatables
	var vm = $scope;
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2).withBootstrap().withBootstrapOptions({
            TableTools: {
                classes: {
                    container: 'btn-group',
                    buttons: {
                        normal: 'btn btn-danger'
                    }
                }
            },
            ColVis: {
                classes: {
                    masterButton: 'btn btn-primary'
                }
            },
            pagination: {
                classes: {
                    ul: 'pagination pagination-sm'
                }
            }
        });
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];

	
	//sidebar active li
	var pId = $location.path(); 
	if(pId=="/companies"){
		$('.nav.menu > li').removeClass('active');
		$('.nav.menu > li:nth-child(2)').addClass('active');
	}
	else if(pId=="/sharePrice"){
		$('.nav.menu > li').removeClass('active');
		$('.nav.menu > li:nth-child(4)').addClass('active');
	}
	
	// init companies
	$scope.companies = {};
	
	//get allCompanies
	$http.post('/api/companies').success(function(data){
		$scope.companies = data;
	});


	//add Company function
	$scope.addCompany = function(){
		var name = $scope.name;
		var description = $scope.description;
		var price = $scope.price;
		$http.post('/api/company/add',{'name':name, 'description':description})
		.then(function(response) {
            console.log(response);
	    });
	    $window.location.href = '/companies';
	};

	//edit company
	$scope.compantData= {};
	$scope.findCompany = function(id){
		$http.post('/api/company/find/'+id).success(function(data){
			$scope.companyData = data;
		});
	};

	//edit company
	$scope.updateCompany = function(id){
		var name = $scope.companyData.name;
		var description = $scope.companyData.description;
		var shareprice = $scope.companyData.shareprice;
		$http.post('/api/company/update/'+id,{'name':name, 'description':description})
		.success(function(response) {
            console.log(response);
	    });
	    $window.location.href = '/companies';
	};

	//delete company
	$scope.deleteCompany = function(id){
		$http.post('/api/company/delete/'+id).success(function(response) {
            console.log(response);
	    });
	    $window.location.href = '/companies';
	};

	//adding shares
	$scope.addShareRate = function(id){
		var shareprice = $scope.company.shareprice;
		
		console.log(id +" "+ shareprice);
		$http.post('/api/company/addShare/'+id,{'shareprice':shareprice}).success(function(data){
		});
	};
}]);