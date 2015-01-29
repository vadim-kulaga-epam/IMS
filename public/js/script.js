var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

app.controller('ModalCtrl', function ($scope, $modal) {
  $scope.status=" Sign in"
  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'modalSignInContent',
      controller: 'ButtonController'
    });
  };

});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ButtonController', function ($scope, $modalInstance, $modal) {

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.signup = function () {
  	$modalInstance.dismiss('cancel');
  	modalInstance = $modal.open({
      templateUrl: 'modalSignUpContent',
      controller: 'ButtonController'
    });
    
  };
});

// configure our routes
app.config(function($routeProvider) {
	$routeProvider
		// route for the home page
		.when('/', {
			templateUrl : 'views/index.html',
			controller  : 'homeController'
		})
		.when('/home', {

			templateUrl : 'views/home.html',
			controller  : 'infoController'
		})
});

// create the controller and inject Angular's $scope
app.controller('infoController', function($scope) {
	// create a message to display in our view
	$scope.status = " Sign out";
  $scope.content = "There are no items to view";
});

app.controller('homeController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Hello! Welcome to IMS.';
});