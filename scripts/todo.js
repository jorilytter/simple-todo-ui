var server = 'http://localhost:9000/';

var app = angular.module('todoApp', ['ngRoute']);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('SingleTaskCtrl', function($scope, $http, $routeParams) {
	$http.get(server+'task/'+$routeParams.id)
	.success(function(data) {
		$scope.task = data;
	}).error(function() {
		alert('something terrible happened');
	});
});

app.controller('TaskCtrl', function($scope, $http, $route, $location) {
	
	$scope.getTodo = function() {
		$http.get(server+'task/todo')
		.success(function(data) {
			$scope.tasks = data.tasks;
		}).error(function() {
			alert('something terrible happened');
		});
	};
	
	$scope.getOngoing = function() {
		$http.get(server+'task/ongoing')
		.success(function(data) {
			$scope.tasks = data.tasks;
		}).error(function() {
			alert('something terrible happened');
		});
	};
	
	$scope.getDone = function() {
		$http.get(server+'task/done')
		.success(function(data) {
			$scope.tasks = data.tasks;
		}).error(function() {
			alert('something terrible happened');
		});
	};
	
	$scope.getRemoved = function() {
		$http.get(server+'task/removed')
		.success(function(data) {
			$scope.tasks = data.tasks;
		}).error(function() {
			alert('something terrible happened');
		});
	};
	
	$scope.createTask = function(topic, explanation) {
		var task = {
				topic:topic,
				explanation:explanation
		};
		$http.post(server+'task', task)
		.success(function(data) {
			$route.reload();
		}).error(function() {
			alert("save didn't work");
		});
	};
	
	$scope.updateTask = function(id, topic, explanation) {
		var task = {
				topic:topic,
				explanation:explanation
		};
		$http.put(server+'task/'+id, task)
		.success(function(data) {
			$route.reload();
		}).error(function() {
			alert("update didn't work");
		});
	};
	
	$scope.removeTask = function(id) {
		$http.put(server+'task/'+id+'/remove')
		.success(function(data) {
			$route.reload();
		}).error(function() {
			alert("remove didn't work");
		});
	};
	
	$scope.startTask = function(id) {
		$http.put(server+'task/'+id+'/start')
		.success(function(data) {
			$route.reload();
		}).error(function() {
			alert("start didn't work");
		});
	};
	
	$scope.finishTask = function(id) {
		$http.put(server+'task/'+id+'/finish')
		.success(function(data) {
			$route.reload();
		}).error(function() {
			alert("finish didn't work");
		});
	};

	if ($location.path() == '/ongoing') {
		$scope.getOngoing();
	} else if ($location.path() == '/done') {
		$scope.getDone();
	} else if ($location.path() == '/todo') {
		$scope.getTodo();
	} else if ($location.path() == '/removed') {
		$scope.getRemoved();
	} else {
		$location.path('/todo');
	}
	
	$scope.showActions = function() {
		return $location.path() == '/removed' || $location.path() == '/done';
	};
});

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/todo', {
		templateUrl:'partials/taskList.html',
		controller:'TaskCtrl'
	})
	.when('/ongoing', {
		templateUrl:'partials/taskList.html',
		controller:'TaskCtrl'
	})
	.when('/done', {
		templateUrl:'partials/taskList.html',
		controller:'TaskCtrl'
	})
	.when('/removed', {
		templateUrl:'partials/taskList.html',
		controller:'TaskCtrl'
	})
	.when('/task/:id', {
		templateUrl:'partials/task.html',
		controller:'SingleTaskCtrl'
	})
	.otherwise({
		redirectTo:'/todo'
	});
}]);