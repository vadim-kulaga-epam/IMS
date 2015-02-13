var app = angular.module("app");
app.controller("ButtonController", function($scope, $modalInstance, $modal, $cookieStore,
 $http, sessionService) {
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

    $scope.signin = function () {
        $scope.statusAuth = false;
        if ($scope.user === undefined) {
            $scope.errorMessage = "Field ‘Login’ cannot be empty";
            console.log("this.errorMessage: " + this.errorMessage);
            $scope.displayErrorMessage = true;
        } else if ($scope.password === undefined) {
            $scope.errorMessage = "Field ‘Password’ cannot be empty";
            console.log("this.errorMessage: " + this.errorMessage);
            $scope.displayErrorMessage = true;
        } else {
            $http.post('/user', {login: $scope.user, password: $scope.password})
                .success(function (data, status, headers, config) {
                    sessionService.createSession(data._id, data.login, data.role);
                    // $cookieStore.put("user", user);
                    $scope.statusAuth = true;
                    $scope.errorMessage = null;
                    $scope.displayErrorMessage = false;
                    document.location.href = "#supplies";
                    $scope.cancel();
                })
                .error(function (data, status, headers, config) {
                    console.log("Error! User doesn't exists!");
                    console.log("Password: " + $scope.password);
                    console.log("data:" + $scope.user);
                    $scope.errorMessage = "There is no user with such login or password";
                    console.log("this.errorMessage: " + $scope.errorMessage);
                    $scope.displayErrorMessage = true;
                });
        }
    };

});