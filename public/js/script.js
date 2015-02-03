(function () {
    var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);

    app.controller('ModalCtrl', function ($scope, $modal) {

        $scope.items = [
            {name: "tea",
                status: "Available"},
            {name: "coffee",
                status: "Available"},
            {name: "kitchenware",
                status: "Available"},
            {name: "stationary",
                status: "Available"}
        ];

        $scope.open = function () {

            var modalInstance = $modal.open({
                templateUrl: 'modalSignInContent',
                controller: 'ButtonController'
            });
        };

        $scope.sweetAlert = function (num, name, status) {
            switch (num) {
                case 0:
                    swal("Here's a message!");
                    break;
                case 1:
                    sweetAlert("Oops...", "Something went wrong!", "error");
                    break;
                case 2:
                    swal("Good job!", "You clicked the button!", "success");
                    break;
                case 3:
                    swal({title: "Are you sure to order " + name + "?", text: "If Yes please specify amount of the " + name + " to be ordered:", type: "warning", showCancelButton: true, confirmButtonText: "Yes", cancelButtonText: "No", closeOnConfirm: false, closeOnCancel: true}, function (isConfirm) {
                        if (isConfirm) {
                            swal("Ordered!", name + " has been ordered.", "success");
                        }
                    });
                    status = "Order Submitted";
                    break;
            }
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
    app.config(function ($routeProvider) {
        $routeProvider
                // route for the home page
                .when('/', {
                    templateUrl: 'views/index.html',
                    controller: 'homeController'
                })
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'infoController'
                })
                .when('/supplies', {
                    templateUrl: 'views/supplies.html',
                    controller: 'suppliesController'
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html'
                })
    });

// create the controller and inject Angular's $scope
    app.controller('infoController', function ($scope) {
        // create a message to display in our view
        $scope.content = "There are no items to view";
    });

    app.controller('homeController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello! Welcome to IMS.';
    });

    app.controller('suppliesController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello Supplies!';
    });
    
    app.controller('navbarController', function ($scope) {
        $scope.setVisible = function(visible) {
            $scope.navbarVisible = visible;
        };
        
        $scope.setTab = function (newValue) {
            $scope.navbarVisible = true;
            $scope.tab = newValue;
        };
        
        $scope.isTabSet = function (tab) {
            return $scope.tab == tab;
        };
    });

})();