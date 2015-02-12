(function () {
    var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngCookies']);

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

        $scope.sweetAlert = function (name, status) {
            swal({title: "Are you sure to order " + name + "?", text: "If Yes please specify amount of the " + name + " to be ordered:", type: "warning", showCancelButton: true, confirmButtonText: "Yes", cancelButtonText: "No", closeOnConfirm: false, closeOnCancel: true}, function (isConfirm) {
                if (isConfirm) {
                    swal("Ordered!", name + " has been ordered.", "success");
                }
            });
            status = "Order Submitted";
        };
    });


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


// configure our routes
    app.config(function ($routeProvider) {
        $routeProvider
                // route for the home page
                .when('/', {
                    templateUrl: 'views/index.html',
                    controller: 'homeController'
                })
                .when('/supplies', {
                    templateUrl: 'views/supplies.html',
                    controller: 'suppliesController'
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'settingsController'
                })
                .when('/history', {
                    templateUrl: 'views/history.html',
                    controller: 'historyController'
                })
                .when('/reports', {
                    templateUrl: 'views/reports.html',
                    controller: 'reportsController'
                });
    });

// create the controller and inject Angular's $scope
    app.controller('homeController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello! Welcome to IMS.';
    });

    app.controller('suppliesController', ['$http', '$scope', function ($http, $scope) {
            console.log("supplies!");
            $http.get("/user/login/admin")
                    .success(function (data, status, headers, config) {
                        $scope.items = data;
                        console.log("Success!");
                        console.log("data:" + data);
                        console.log("login:" + data.login);
                        console.log("password:" + data.password);
                        console.log("status:" + status);
                        console.log("headers:" + headers);
                        console.log("config:" + config);
                    })
                    .error(function (data, status, headers, config) {
                        console.log("Error!");
                        console.log("data:" + data);
                        console.log("status:" + status);
                        console.log("headers:" + headers);
                        console.log("config:" + config);
                    });
        }]);

    app.controller('settingsController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello Settings!';
    });

    app.controller('historyController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello History!';
    });

    app.controller('reportsController', function ($scope) {
        // create a message to display in our view
        $scope.message = 'Hello Reports!';
    });

    app.controller('navbarController', function ($scope) {
        $scope.setVisible = function (visible) {
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

    app.directive('ordercancel', function () {
        return {
            restrict: 'A',
            template: '<input value="">',
            link: function (scope, elem, attrs) {
                elem.bind("click", function () {
                    console.log('ordercancel clicked', elem)
                    if (elem.val() == "Cancel") {
                        elem.val("Order Now");
                    } else {
                        elem.val("Cancel");
                    }
                })
            }
        }
    });

    //  app.service('authServiceLogin', function($cookieStore, $http) {
    //     this.login = function(login, password) {
    //         this.status = {
    //             authorized: false,
    //         };
    //         this.errorMessage = null;
    //         $http.get('/user/login/' + login)
    //             .success(function (data, status, headers, config) {
    //                 if (data.password === password) {
    //                     console.log("Success!");
    //                     console.log("Password: " + password);
    //                     console.log("data:" + login);
    //                     var user = {
    //                         id: data.id,
    //                         login: data.login,
    //                         password: data.password,
    //                         role: data.role,
    //                     };
    //                     $cookieStore.put("user", user);
    //                     this.status.authorized = true;
    //                     return this.errorMessage;
    //                 } else {
    //                     console.log("Error! User doesn't exists!");
    //                     console.log("Password: " + password);
    //                     console.log("data:" + login);
    //                     this.errorMessage = "There is no user with such login or password"
    //                     console.log("this.errorMessage: " + this.errorMessage);
    //                     return this.errorMessage;
    //                 }
    //             })
    //             .error(function (data, status, headers, config) {
    //                 console.log("Error! User doesn't exists!");
    //                 console.log("Password: " + password);
    //                 console.log("data:" + login);
    //                 this.errorMessage = "There is no user with such login or password"
    //                 console.log("this.errorMessage: " + this.errorMessage);
    //                 return this.errorMessage;
    //             });
    //             console.log("this.errorMessage: " + this.errorMessage);
    //     }
    // })


})();