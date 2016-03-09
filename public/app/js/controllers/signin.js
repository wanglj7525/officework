'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', [ '$scope', '$http', '$state','$localStorage',
		function($scope, $http, $state,$localStorage) {
			$scope.user = {};
			$scope.authError = null;
			$scope.login = function() {
				$scope.authError = null;
				var params = {
					email : $scope.user.email,
					password : $scope.user.password
				};
				console.log(params);

				var data={
					access_token:'123456',
					info:{
						role_id:'1',
						id:'402882f5535a038b01535a0531b40003'
					}
				}
				$localStorage.token=data.access_token;
				$localStorage.user=data.info;
				$state.go('app.worktip.list');
				// Try to login
				//$http.post('/rest/login', params).success(function(data) {
				//	if (data.result == "success") {
				//		//存储access_token
				//		$localStorage.token=data.access_token;
				//		$localStorage.user=data.info;
				//		console.log($localStorage.user);
				//		$state.go('app.worktip.list');
				//	} else {
				//		$scope.authError = 'Email or Password not right';
				//	}
				//}).error(function(data) {
				//	alert(data);
				//	$scope.authError = 'Server Error';
				//});
			};
		} ]);

//app.controller('SigninFormController', [ '$scope', '$http', '$state','$localStorage','SERVICE_URL',
//	function($scope, $http, $state,$localStorage,SERVICE_URL) {
//		$scope.user = {};
//		$scope.authError = null;
//		$scope.login = function() {
//			$scope.authError = null;
//			var params = {
//				username : $scope.user.email,
//				password : $scope.user.password
//			};
//			// Try to login
//			$http.post(SERVICE_URL+'/loginService/login', params).success(function(data) {
//				if (data.result == "success") {
//					//存储access_token
//					$localStorage.token=data.access_token;
//					$localStorage.user=data.info;
//					console.log($localStorage.user);
//					$state.go('app.worktip.list');
//				} else {
//					$scope.authError = 'Email or Password not right';
//				}
//			}).error(function(data) {
//				alert(data);
//				$scope.authError = 'Server Error';
//			});
//		};
//	} ]);