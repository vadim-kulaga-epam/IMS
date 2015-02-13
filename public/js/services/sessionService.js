var app = angular.module("app");
app.service("sessionService", function () {
  this.createSession = function (userId, login, userRole) {
    this.id = Math.random();
    this.userId = userId;
    this.login = login
    this.userRole = userRole;
  };
  this.destroySession = function () {
    this.id = null;
    this.userId = null;
    this.login = null;
    this.userRole = null;
  };
  return this;
})