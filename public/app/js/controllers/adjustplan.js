'use strict';
app.controller('ModalDeleteAdjustInstanceCtrl', ['$scope', '$modalInstance' ,'item',function($scope, $modalInstance,item) {
	
	$scope.ok = function () {
		$modalInstance.close(item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('planController',[ '$scope', '$http', '$state','$timeout','UIAdjustplanService','$modal','$localStorage','SERVICE_URL',
	function($scope, $http, $state, $timeout,UIAdjustplanService,$modal,$localStorage,SERVICE_URL) {
		var postData = $.param({
			access_token:$localStorage.token
		});
		UIAdjustplanService.getAdjustplanList(postData).then(
			function (res) {
				$scope.planlist = res.data.info;
				console.log($scope.planlist)
				$scope.currentname=$scope.planlist[0].name;
				$scope.currentid=$scope.planlist[0].id;
				$scope.exportid=$scope.planlist[0].id;
				var postData1 = $.param({
					id:$scope.currentid,
					access_token:$localStorage.token
				});
					UIAdjustplanService.getAdjustplanDetail(postData1).then(
						function(res){
							$scope.plandetail=res.data.info;
							console.log($scope.plandetail)
						},

						function(rej){
							console.log(rej);
						}
					);
				var postData2 = $.param({
					id:$scope.planlist[0].id,
					access_token:$localStorage.token
				});
				UIAdjustplanService.getAdjustplanDetail(postData2).then(
					function(res){
						$scope.plandetail=res.data.info;
						console.log($scope.plandetail)
					},
					function(rej){
						console.log(rej);
					}
				);
			
			},
			function (rej) {
				console.log(rej);
			}
		);
		$scope.selectdplan=function(plan){
			$scope.currentid=plan.id;
			$scope.exportid=plan.id;
			$scope.currentname=plan.name;
			var postData3 = $.param({
				id:$scope.currentid,
				access_token:$localStorage.token
			});
			UIAdjustplanService.getAdjustplanDetail(postData3).then(
				function(res){
					$scope.plandetail=res.data.info;
					console.log($scope.plandetail)
				},
				
				function(rej){
					console.log(rej);
				}
			);

		}
		$scope.explort=function(){
			var postData=$.param({
				id:$scope.exportid,
				access_token:$localStorage.token
			})
			UIAdjustplanService.exportAdjustolan(postData).then(
				function (res) {
					console.log(res.data.info);
					console.log(SERVICE_URL);
					$scope.docurl=SERVICE_URL+res.data.info
					console.log($scope.docurl);
					window.location.href=$scope.docurl;

				},
				function (rej) {
					console.log(rej);
				}
			);
		}
		$scope.deletaplan=function(plandetail){
			console.log(plandetail)
			var modaladjustdeleteInstance = $modal.open({
				templateUrl: 'deleteAdjustModel.html',
				controller: 'ModalDeleteAdjustInstanceCtrl',
				size: 'sm',
				resolve: {
					item:function(){return plandetail.schedule_name}
				}
			});
			modaladjustdeleteInstance.result.then(function (item) {
				var postData4 = $.param({
					id:$scope.currentid,
					access_token:$localStorage.token
				});
				UIAdjustplanService.delAdjustPlan(postData4).then(
					function(res){
						$scope.temp11=$scope.planlist.length
						if(res.data.code==200){
							var postData6 = $.param({
								access_token:$localStorage.token
							});
							UIAdjustplanService.getAdjustplanList(postData6).then(
								function (res) {
									$scope.planlist = res.data.info;
									$scope.currentname=$scope.planlist[0].name;
									$scope.currentid=$scope.planlist[0].id;
									var postData5 = $.param({
										id:$scope.planlist[0].id,
										access_token:$localStorage.token
									});
									UIAdjustplanService.getAdjustplanDetail(postData5).then(
										function(res){
											$scope.plandetail=res.data.info;
										},
										function(rej){
											console.log(rej);
										}
									);
								},
								function (rej) {
									console.log(rej);
								}
							);
						}
					},
					function(rej){
						console.log(rej);
					}
				);
			}, function () {
			});
		}
	}
]);
//app.controller('plandetailcontroller',[ '$scope', '$http', '$state','$timeout','$stateParams','plandetailservice',
//	function($scope, $http, $state, $timeout,$stateParams,plandetailservice) {
//		$scope.id = $stateParams.id;
//		plandetailservice.getData().then(
//			function (res) {
//				$scope.plandetail = res.data.info
//			},
//			function (rej) {
//				console.log(rej);
//			}
//		);
//	}
//]);