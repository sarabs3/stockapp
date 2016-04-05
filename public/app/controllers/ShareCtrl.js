angular.module('ShareCtrl',['datatables','datatables.bootstrap'],function($locationProvider){
	$locationProvider.html5Mode(true);
}).controller('ShareController',['$scope','$http', '$location', '$window', 'DTOptionsBuilder', 'DTColumnDefBuilder','$routeParams' , function($scope, $http, $location , $window , DTOptionsBuilder , DTColumnDefBuilder , $routeParams ){
	
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
	$scope.companyid = $routeParams.companyid;
	var pId = $location.path(); 
	if(pId=="/sharePrice/"+$scope.companyid){
		$('.nav.menu > li').removeClass('active');
		$('.nav.menu > li:nth-child(2)').addClass('active');
	}

	// init companies
	$scope.companySharesDetails = {};
	
	//get allCompanies
	$http.post('/api/company/sharepricelist/'+$scope.companyid).success(function(data){
		$scope.companySharesDetails = data;
		console.log(data);
	});


	//adding shares
	$scope.addShareRate = function(id){
		var shareprice = $scope.company.shareprice;
		
		console.log(id +" "+ shareprice);
		$http.post('/api/company/addShare/'+id,{'shareprice':shareprice}).success(function(data){
		});
	};
}]);