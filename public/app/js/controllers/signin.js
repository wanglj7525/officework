'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', [ '$scope', '$http', '$state',
		function($scope, $http, $state) {
			$scope.user = {};
			$scope.authError = null;
			$scope.login = function() {
				$scope.authError = null;
				var params = {
					email : $scope.user.email,
					password : $scope.user.password
				};
				// Try to login
				$http.post('/rest/login', params).success(function(data) {
					console.log(data.msg);
					if (data.result == "success") {
						$state.go('notree.worktip.list');
					} else {
						$scope.authError = 'Email or Password not right';
					}
				}).error(function(data) {
					alert(data);
					$scope.authError = 'Server Error';
				});
			};
		} ]);
