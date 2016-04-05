angular.module("appRoutes",[]).config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
		.when('/',{
			templateUrl:'views/dashboard.html',
			controller:'DashboardController'
		})
		.when('/companies',{
			templateUrl:'views/companies.html',
			controller:'CompanyController'
		})
		.when('/experts',{
			templateUrl:'views/experts.html',
			controller:'ExpertController'
		}).
		when('/sharePrice/:companyid',{
			templateUrl:'views/add-share-price.html',
			controller:'ShareController'
		}).
		when('/prediction',{
			templateUrl:'views/add-prediction.html',
			controller:'PredictionController'
		});

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	}).hashPrefix('*');
}]);