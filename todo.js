var app = angular.module('todoApp', ['ngResource']);
console.log('alussa');

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('TodoCtrl', function($scope, $http) {
	$http.get('http://localhost:9000/task/create/')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

app.controller('OngoingCtrl', function($scope, $http) {
	$http.get('http://localhost:9000/task/start/')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

app.controller('DoneCtrl', function($scope, $http) {
	console.log('controllerissa');
	$http.get('http://localhost:9000/task/finish/')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

app.controller('RemoveCtrl', function($scope, $http) {
	console.log('controllerissa');
	$http.get('http://localhost:9000/task/remove/')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});
