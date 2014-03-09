var server = 'http://localhost:9000/';

var app = angular.module('todoApp', ['ngRoute','todoControllers','todoServices']);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/task/:taskId', {
		templateUrl:'partials/task.html',
		controller:'TaskCtrl'
	})
	.when('/start/:taskId', {
		templateUrl:'partials/task.html',
		controller:'TaskStartCtrl'
	})
	.when('/finish/:taskId', {
		templateUrl:'partials/task.html',
		controller:'TaskDoneCtrl'
	})
	.when('/remove/:taskId', {
		templateUrl:'partials/task.html',
		controller:'TaskRemoveCtrl'
	})
	.when('/todo', {
		templateUrl:'partials/taskList.html',
		controller:'TodoCtrl'
	})
	.when('/ongoing', {
		templateUrl:'partials/taskList.html',
		controller:'OngoingCtrl'
	})
	.when('/done', {
		templateUrl:'partials/taskList.html',
		controller:'DoneCtrl'
	})
	.when('/removed', {
		templateUrl:'partials/taskList.html',
		controller:'RemoveCtrl'
	})
	.otherwise({
		redirectTo:'/'
	});
}]);

var todoServices = angular.module('todoServices', ['ngResource']);

todoServices.factory('Task', ['$resource', function($resource) {
	return $resource(server+'task/:taskId/:operation', {taskId:"@taskId",operation:"@operation"}, {
		get: {
			method:'GET', 
			isArray:false
		}
	});
}]);

todoServices.factory('TaskUpdate', ['$resource', function($resource) {
	return $resource(server+'task/:taskId/:operation', {taskId:"@taskId",operation:"@operation"}, {
		put: {
			method:'PUT', 
			isArray:false
		}
	});
}]);

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TaskCtrl', ['$scope', '$routeParams', 'Task', function($scope, $routeParams, Task) {
	$scope.task = Task.get({taskId:$routeParams.taskId});
}]);

todoControllers.controller('TaskStartCtrl', ['$scope', '$routeParams', 'TaskUpdate', function($scope, $routeParams, TaskUpdate) {
	$scope.task = TaskUpdate.put({taskId:$routeParams.taskId, operation:'start'});
}]);

todoControllers.controller('TaskDoneCtrl', ['$scope', '$routeParams', 'TaskUpdate', function($scope, $routeParams, TaskUpdate) {
	$scope.task = TaskUpdate.put({taskId:$routeParams.taskId, operation:'finish'});
}]);

todoControllers.controller('TaskRemoveCtrl', ['$scope', '$routeParams', 'TaskUpdate', function($scope, $routeParams, TaskUpdate) {
	$scope.task = TaskUpdate.put({taskId:$routeParams.taskId, operation:'remove'});
}]);

todoControllers.controller('TodoCtrl', function($scope, $http) {
$http.get(server+'task/create')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

todoControllers.controller('OngoingCtrl', function($scope, $http) {
	$http.get(server+'task/start')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

todoControllers.controller('DoneCtrl', function($scope, $http) {
	$http.get(server+'task/finish')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});

todoControllers.controller('RemoveCtrl', function($scope, $http) {
	$http.get(server+'task/remove')
	.success(function(data) {
		$scope.tasks = data.tasks;
	}).error(function() {
		alert("something terrible happened");
	});
});
