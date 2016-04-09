'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', [ '$scope', '$http', '$state','$localStorage','SettinguserService',
		function($scope, $http, $state,$localStorage,SettinguserService) {
			$scope.user = {};
			$scope.authError = null;
			$scope.login = function() {
				$scope.authError = null;
				var params=$.param({
					username : $scope.user.username,
					password : $scope.user.password
				});
				SettinguserService.loginservice(params).then(
					function(res){
						console.log(res);
						console.log(res.data.info);
						//$localStorage.userstate=res.data.info.setting.state;
						if(res.data.code==200){
							//存储access_token
							$localStorage.token=res.data.info.access_token;
							$localStorage.user=res.data.info;
							console.log($localStorage.user)
							var params=$.param({
								resource : 'OPERATION_system_setting',
								access_token : $localStorage.token
							});
							SettinguserService.authservice(params).then(
								function(res){
									console.log(res);
									$localStorage.isuser=res.data.info;
									console.log($localStorage.isuser);
									$state.go('app.worktip');
								},
								function(rej){

								}
							)
						}else {
							$scope.authError = '用户名或者密码错误';
						}
					},
					function(rej){
						$scope.authError = '服务器异常';
					}
				);

				//var data={
				//	access_token:'123456',
				//	info:{
				//		role_id:'1',
				//		id:'402882f5535a038b01535a0531b40003'
				//	}
				//}
				//$localStorage.token=data.access_token;
				//$localStorage.user=data.info;
				//$state.go('app.worktip.list');
			};
		} ]);